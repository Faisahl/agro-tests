export type Crop = {
  id: number;
  documentId: string;
  crop_name: string;
  urdu_name: string;
  unit_wght: number;
  season: string;
  ph_levels: string;
  crop_summary: string;
  crop_image: string;
  daily_crop_prices: CropPrice[];
  crop_categories: CropCategory[];
}

export type CropPrice = {
  price_date: string;
  daily_price: number;
  location: Location;
  crop_type: Crop;
}

export type CropCategory = {
  documentId: string;
  type: string;
  typeUr: string;
  crop_types: Crop[];
}

export type Location = {
  documentId: string;
  name: string;
  shorthand: string;
}