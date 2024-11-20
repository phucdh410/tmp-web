import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMPaymentInputProps } from "./types";

export const MPaymentInput = ({ control }: IMPaymentInputProps) => {
  //#region Data
  const { data: payments = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-hinh-thuc-thanh-toan"],
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="hinh_thuc_thanh_toan"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          options={payments}
          placeholder="Chọn hình thức thanh toán"
          {...field}
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
