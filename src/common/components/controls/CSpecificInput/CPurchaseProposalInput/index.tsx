import { Controller, Path } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllPurchaseProposals } from "@hooks/options";

import { ICPurchaseProposalInputProps, IPurchaseProposalInput } from "./types";

export const CPurchaseProposalInput = <T extends IPurchaseProposalInput>({
  control,
  isEdit,
}: ICPurchaseProposalInputProps<T>) => {
  //#region Data
  const { purchaseProposals } = useGetAllPurchaseProposals();
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"document_code" as Path<T>}
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          disabled={isEdit}
          options={purchaseProposals}
          error={!!error}
          placeholder="Chọn phiếu đề xuất"
          {...field}
        />
      )}
    />
  );
  //#endregion
};
