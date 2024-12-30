import { Controller } from "react-hook-form";

import { receiptsApi } from "@apis/receipts.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMReceiptInputProps } from "./types";

export const MReceiptInput = ({ control }: IMReceiptInputProps) => {
  //#region Data
  const { data: receipts = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-phieu-ghi-tang"],
    queryFn: () => receiptsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.code })),
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="receipt_id"
      render={({ field }) => (
        <CAutocomplete
          options={receipts}
          disableClearable={false}
          {...field}
          placeholder="Chọn phiếu ghi tăng"
        />
      )}
    />
  );
  //#endregion
};
