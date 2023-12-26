import { AxiosError } from "axios";

export interface LoginSuccesType {
  data: {
    token: string;
  };
}

export type LoginErrorType = AxiosError<{
  message: { [key: string]: string };
}>;

export interface LoginDataType {
  login: string;
  password: string;
}

export interface RegisterSuccesType {
  data: {
    token: string;
  };
}

export type RegisterErrorType = AxiosError<{
  message: { [key: string]: string };
}>;

export interface RegisterDataType {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}
