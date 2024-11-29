import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginPayload } from "@interfaces/auth";
import { object, string } from "yup";

export const defaultValues: ILoginPayload = {
  username: "",
  password: "",
};

export const resolver: Resolver<ILoginPayload> = yupResolver(
  object({
    username: string().required("Bạn vui lòng nhập tên tài khoản"),
    password: string().required("Bạn vui lòng nhập mật khẩu"),
  })
);
