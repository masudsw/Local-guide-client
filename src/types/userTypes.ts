export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "GUIDE" | "TOURIST";
  exp: number;
  iat: number;
}