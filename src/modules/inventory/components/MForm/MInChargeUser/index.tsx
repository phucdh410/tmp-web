import { Controller, useWatch } from "react-hook-form";

import { usersApi } from "@apis/users.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMInChargeUserProps } from "./types";

export const MInChargeUser = ({ control }: IMInChargeUserProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { data: users = [], isFetching } = useQuery({
    queryKey: ["danh-sach-nhan-vien-phu-trach-cua-hang", store_code],
    queryFn: () => usersApi.getAll({ store_code }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.id, label: e?.fullname })),
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="user_id"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          loading={isFetching}
          options={users}
          placeholder="Nhân viên phụ trách kiểm"
          {...field}
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
