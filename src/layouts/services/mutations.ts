import { useMutation } from "@tanstack/react-query";
import { $host } from "../../services/requestService";
import {
  LoginDataType,
  LoginErrorType,
  LoginSuccesType,
  RegisterDataType,
  RegisterErrorType,
  RegisterSuccesType,
} from "../types/mutationsTypes";

export function useLogin() {
  return useMutation<LoginSuccesType, LoginErrorType, LoginDataType>(
    async (data) => {
      const res = $host.post("/users/login", data);
      return res;
    },
    {
      onSuccess: (res) => {
        localStorage.setItem("token", res?.data.token);
      },
    }
  );
}

export function useRegister() {
  return useMutation<RegisterSuccesType, RegisterErrorType, RegisterDataType>(
    async (data) => {
      const res = $host.post("/users/register", data);
      return res;
    }
  );
}
