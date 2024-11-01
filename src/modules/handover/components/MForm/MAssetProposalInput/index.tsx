import { Controller } from "react-hook-form";

import { outsidesApi } from "@apis/outsides.api";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAssetProposalInputProps } from "./types";

export const MAssetProposalInput = ({
  control,
  isEdit,
}: IMAssetProposalInputProps) => {
  //#region Data
  const { data: asset_proposals = [] } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-mua-hang"],
    queryFn: () => outsidesApi.getAllAssetProposals(),
    select: (response) =>
      response.data.data?.map((e) => ({
        id: e.document_code,
        label: e.document_code,
      })),
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="document_code"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          disabled={isEdit}
          options={asset_proposals}
          error={!!error}
          placeholder="Chọn phiếu đề xuất"
          {...field}
        />
      )}
    />
  );
  //#endregion
};
