import { test, expect } from "../../fixtures/e2e/crop-to-profile";

test('user flow of tracking crop to profile view', async ({ authenticated, page, navBar, userProfile, cropGrid }) => {
  const slct = 1;

  await navBar.marketBtn.click();
  await expect(page).toHaveTitle('View Rates - Kashtdar');
  
  await expect(page.getByTestId('grid-add-svg').first()).toBeVisible();
  // await page.waitForLoadState('networkidle');

  const cropName = await cropGrid.getCropCardName(slct);
  await page.waitForTimeout(750); // wait for user recognition
  await cropGrid.trackCrop(slct);
  await expect(cropGrid.checkTracked(slct)).toBeVisible();

  await navBar.openUserDD();
  const pb = await navBar.getUserDDItem('Profile');
  pb.click();
  await expect(page).toHaveTitle('User Profile - Kashtdar');

  const userCrops: string[] = await userProfile.getUserCrops();
  console.log('crops:'+cropName)
  const cropNowTracked = userCrops.includes(cropName);

  expect(cropNowTracked).toBe(true);

  const widget = userProfile.getUCWidget(cropName);
  await widget.click();
  
  await page.waitForTimeout(500); // wait for the slide animation

  const removal = userProfile.getUCItem(cropName);
  const deleteBtn = removal.getByRole('button', { name: 'delete-uc' });
  await deleteBtn.click();

  expect(cropNowTracked).toBe(false);
});