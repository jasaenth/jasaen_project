export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}