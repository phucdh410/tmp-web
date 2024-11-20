import { Controller } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMWarrantyInputProps } from "./types";

export const MWarrantyInput = ({ control }: IMWarrantyInputProps) => {
  //#region Data
  const { data: warranties = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-dich-vu-bao-hanh"],
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="dich_vu_bao_hanh"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          options={warranties}
          placeholder="Chọn dịch vụ bảo hành"
          {...field}
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
