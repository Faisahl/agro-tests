import test, { expect, request } from "@playwright/test";
import { Crop } from "../../types/Crop";
const agro_key = 'Sb0TGzuIpB1QKwphRlW6SEncP1N9Qio8qkGwrQsdohDadaEOMSVue8mgvzzGwPMa6utkf7PjsNaSyvVGcaWLXWbM7u8ep24BVkgYR29sTT3jSB9mPabiqX9YgAVQhlK0';

test('GET crop range', async () => {
  const docId = 'omi72trf5shaidwdiq6t0e2w';
  const limit = 14;
  const location = 'karachi';

  const context = await request.newContext({
    baseURL: 'http://localhost:1337',
    extraHTTPHeaders: {
      'agro-api-key': process.env.BACKEND_KEY || agro_key,
    }
  });

  const res = await context.get(`/api/crop-types/${docId}/range?limit=${limit}&location=${location}`);
  expect(res.status()).toBe(200);

  const data: Crop = await res.json();

  expect(Array.isArray(data.daily_crop_prices)).toBe(true);
  expect(data?.daily_crop_prices.length).toBe(limit);

});