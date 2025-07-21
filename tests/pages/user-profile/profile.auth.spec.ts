import test, { expect, request } from "@playwright/test";
import { UserProfilePage } from "../../../pages/user-profile.page";
import { User } from "../../../types/User";
import useToken from "../../../utils/useToken";
import dotenv from 'dotenv'

dotenv.config();
let user: User;

test.beforeAll(async () => {
  const token = useToken();
  const context = await request.newContext({
    baseURL: process.env.API_TEST_URL || 'http://localhost:1337',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${token}`,
      'agro-api-key': process.env.AGRO_KEY!,
    }
  });
  const response = await context.get('/api/users/me');
  user = await response.json();
});

test.beforeEach(async ({ page }) => {
  const profile: UserProfilePage = new UserProfilePage(page);
  await profile.goto();
});

test('verify correct username in profile', async ({ page }) => {
  const profile: UserProfilePage = new UserProfilePage(page);
  // await profile.goto();

  const username = profile.username;
  await expect(username).toBeVisible();

  const ut = await username.textContent();
  const name = ut?.match(/Hello, (.+?)!/)?.[1];
  expect(name).toBe(user.username);
});

test('verify user crops populated', async ({ page }) => {
  const profile: UserProfilePage = new UserProfilePage(page);
  // await profile.goto();

  const crops = (await profile.getUserCrops()).length;
  expect(crops).toBeGreaterThan(0);
});

