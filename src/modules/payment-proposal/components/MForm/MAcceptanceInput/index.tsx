import { Controller } from "react-hook-form";

import { acceptancesApi } from "@apis/acceptances.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAcceptanceInputProps } from "./types";

export const MAcceptanceInput = ({ control }: IMAcceptanceInputProps) => {
  //#region Data
  const { data: acceptances = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-phieu-nghiem-thu"],
    queryFn: () => acceptancesApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.code })),
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="acceptance_id"
      render={({ field }) => (
        <CAutocomplete
          options={acceptances}
          disableClearable={false}
          {...field}
          placeholder="Chọn phiếu BBNT"
        />
      )}
    />
  );
  //#endregion
};
