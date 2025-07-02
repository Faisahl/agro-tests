import { Crop } from "./Crop";

export type User = {
  id: number;
  documentId: string,
  username: string,
  email: string,
  provider: string,
  password: string,
  contact_no: string,
  resetPasswordToken: string,
  confirmationToken: string,
  confirmed: boolean,
  blocked: boolean,
  role: Role,
  user_crops: Crop[]
}

type Role = {
  id: number;
  documentId: string;
  name: string;
  type: string;
}
