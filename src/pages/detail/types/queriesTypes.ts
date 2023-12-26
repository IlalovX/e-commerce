import { AxiosError } from "axios";

export type DetailErrorType = AxiosError<{
  message: { [key: string]: string };
}>;
