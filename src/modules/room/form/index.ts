import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { IRoomPayload } from "@interfaces/rooms";
import dayjs from "dayjs";
import { number, object, string } from "yup";

export const defaultValues: IRoomPayload = {
  id: "",
  code: "",
  name: "",
  store_code: "",
  room_group_id: -1,
  status: 1,
  place_position_id: -1,
  apply_from: dayjs().toString(),
};

export const resolver: Resolver<IRoomPayload> = yupResolver(
  object({
    id: string().optional(),
    code: string().optional(),
    name: string().required("Vui lòng nhập field này"),
    store_code: string().required("Vui lòng nhập field này"),
    room_group_id: number().required("Vui lòng nhập field này"),
    status: number().required("Vui lòng nhập field này"),
    place_position_id: number().required("Vui lòng nhập field này"),
    apply_from: string().required("Vui lòng nhập field này"),
  })
);
