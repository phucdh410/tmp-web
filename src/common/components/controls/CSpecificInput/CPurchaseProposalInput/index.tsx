import { Controller, Path } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllPurchaseProposals } from "@hooks/options";

import { ICPurchaseProposalInputProps, IPurchaseProposalInput } from "./types";

export const CPurchaseProposalInput = <T extends IPurchaseProposalInput>({
  control,
  isEdit,
  status,
}: ICPurchaseProposalInputProps<T>) => {
  //#region Data
  const { purchaseProposals, loading } = useGetAllPurchaseProposals({
    status: status ? status : "",
  });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name={"document_code" as Path<T>}
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          // disabled={isEdit}
          loading={loading}
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
