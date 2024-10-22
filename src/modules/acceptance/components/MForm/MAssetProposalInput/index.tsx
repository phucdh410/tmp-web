import { Controller } from "react-hook-form";

import { outsidesApi } from "@apis/outsides.api";
import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMAssetProposalInputProps } from "./types";

export const MAssetProposalInput = ({
  control,
  isEdit,
  setValue,
}: IMAssetProposalInputProps) => {
  //#region Data
  const { data: asset_proposals = [] } = useQuery({
    queryKey: ["danh-sach-phieu-de-xuat-mua-hang"],
    queryFn: () => outsidesApi.getAllAssetProposals(),
    select: (response) =>
      response.data.data?.map((e) => ({
        id: e.document_code,
        label: e.document_code,
        price: e.price,
        quantity: e.quantity,
        description: e.description,
        asset_name: e.asset_name,
      })),
  });
  //#endregion

  //#region Event
  const onAssetChange =
    (onChangeCallback: (newValue: string) => void) =>
    (
      value: string,
      event?: React.SyntheticEvent,
      selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
    ) => {
      onChangeCallback(value);
      if (!Array.isArray(selectedOption)) {
        setValue("asset_name", selectedOption?.asset_name ?? "");
        setValue("price", selectedOption?.price ?? 0);
        setValue("quantity", selectedOption?.quantity ?? 1);
        setValue("description", selectedOption?.description ?? "");
      }
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="document_code"
      render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
        <CAutocomplete
          disabled={isEdit}
          options={asset_proposals}
          error={!!error}
          placeholder="Chọn phiếu đề xuất"
          onChange={onAssetChange(onChange)}
          {..._field}
        />
      )}
    />
  );
  //#endregion
};
