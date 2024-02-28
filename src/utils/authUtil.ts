import { jwtDecode } from "jwt-decode";
import { IUser } from "../interfaces/user";

export const getUserToken = () => {
  const token = localStorage.getItem("farmer-token") ?? null;

  if (token) {
    const user: IUser = jwtDecode(token) as IUser;

    return user;
  }

  return null;
};

export const saveUserToken = (token: string) => {
  localStorage.setItem("farmer-token", token);
};

export const clearUserToken = () => {
  localStorage.removeItem("farmer-token");
};
