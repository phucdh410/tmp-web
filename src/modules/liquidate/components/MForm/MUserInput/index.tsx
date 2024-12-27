import { Controller, useWatch } from "react-hook-form";

import { usersApi } from "@apis/users.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMUserInputProps } from "./types";

export const MUserInput = ({ control, isEdit }: IMUserInputProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { data: users = [] } = useQuery({
    queryKey: ["nhan-vien-tai-chi-nhanh", store_code],
    queryFn: () => usersApi.getByStore(store_code),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.fullname })),
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="user_id"
      render={({ field }) => (
        <CAutocomplete
          placeholder="Chọn nhân viên"
          options={users}
          disabled={isEdit || !store_code}
          isDirtyOptions
          {...field}
        />
      )}
    />
  );
  //#endregion
};
