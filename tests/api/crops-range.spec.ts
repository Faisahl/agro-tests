import test, { expect, request } from "@playwright/test";
import dotenv from 'dotenv'
import { Crop } from "../../types/Crop";

dotenv.config();

test('GET crop range', async () => {
  const docId = 'omi72trf5shaidwdiq6t0e2w';
  const limit = 14;
  const location = 'karachi';

  const context = await request.newContext({
    baseURL: 'http://localhost:1337',
    extraHTTPHeaders: {
      'agro-api-key': process.env.AGRO_KEY!
    }
  });

  const res = await context.get(`/api/crop-types/${docId}/range?limit=${limit}&location=${location}`);
  expect(res.status()).toBe(200);

  const data: Crop = await res.json();

  expect(Array.isArray(data.daily_crop_prices)).toBe(true);
  expect(data?.daily_crop_prices.length).toBe(limit);

});