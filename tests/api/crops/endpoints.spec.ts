import { test, request, expect } from "@playwright/test";
import { Crop, CropRes } from "../../../types/Crop";
import dotenv from 'dotenv';
import areDatesDesc from '../../../utils/areDatesDesc';

dotenv.config();

type TopTenRes = {
  id: string,
  name: string,
  percentChange: number,
  price: number,
  date: Date,
  nameUr: string,
};

const testdata = {
  market: "karachi",
  docId: 'omi72trf5shaidwdiq6t0e2w',
  cropType: 'vegetable',
  bURL: process.env.API_TEST_URL || 'http://localhost:1337',
  agroKey: process.env.AGRO_KEY!
};

test.describe("GET crops", () => {
  test("tca_01 - GET home page crops", async () => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        'agro-api-key': `${process.env.AGRO_KEY!}`,
      }
    });

    const res = await context.get(`${testdata.bURL}/api/crop-types?location=${testdata.market}`);
    expect(res.status()).toBe(200);
    const data: Crop[] = await res.json();
  });

  // dcp = daily_crop_price
  test("tca_02 - GET grid crops (dcp desc)", async () => {
    const pageNum: number = 1;
    const context = await request.newContext({
      extraHTTPHeaders: {
        'agro-api-key': process.env.AGRO_KEY!,
      }
    });

    const res = await context.get(`${testdata.bURL}/api/crop-types/allDesc/${pageNum}/${testdata.market}`);
    expect(res.status()).toBe(200);
    const data: CropRes = await res.json();
    
    const cp = data?.data[0]?.daily_crop_prices;
    const prices = cp?.map(price=> new Date(price.price_date));

    expect(areDatesDesc(prices)).toBe(true);
  });

  test('tca_03 - GET single crop (dcp desc)', async () => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        'agro-api-key': process.env.AGRO_KEY!,
      }
    });
    
    const res = await context.get(`${testdata.bURL}/api/crop-types/${testdata.docId}/market/${testdata.market}`);
    expect(res.status()).toBe(200);
    const data: Crop = await res.json();

    const cp = data.daily_crop_prices;
    const prices = cp.map(price => new Date(price.price_date));
    expect(areDatesDesc(prices)).toBe(true);
  });

  test('tca_04 - GET top(5) crops by daily pct change', async () => {
    const topX = 5;
    const context = await request.newContext({
      extraHTTPHeaders: {
        'agro-api-key': process.env.AGRO_KEY!,
      }
    });

    const res = await context.get(`${testdata.bURL}/api/crop-types/top-today/${testdata.cropType}/${testdata.market}`);
    expect(res.status()).toBe(200);
    const data: TopTenRes[] = await res.json();

    expect(data.length).toBe(topX);
  });

  test('tca_05 - GET crops price range/(14) days', async () => {
    const limit = 14;

    const context = await request.newContext({
      extraHTTPHeaders: {
        'agro-api-key': process.env.AGRO_KEY!,
      }
    });

    const res = await context.get(`${testdata.bURL}/api/crop-types/${testdata.docId}/range?limit=${limit}&location=${testdata.market}`);
    expect(res.status()).toBe(200);

    const data: Crop = await res.json();

    expect(Array.isArray(data.daily_crop_prices)).toBe(true);
    expect(data?.daily_crop_prices.length).toBe(limit);
  })
});
