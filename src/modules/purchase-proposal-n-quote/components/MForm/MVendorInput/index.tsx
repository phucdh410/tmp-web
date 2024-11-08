import { useRef } from "react";
import { Controller, useController } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllVendors } from "@hooks/options";
import { ICreatedVendorResponse } from "@interfaces/vendors";
import { MVendorModal } from "@modules/vendor/components";
import { IMVendorModalRef } from "@modules/vendor/components/MVendorModal/types";

import { IMVendorInputProps } from "./types";

export const MVendorInput = ({ control }: IMVendorInputProps) => {
  //#region Data
  const { vendors, refetch } = useGetAllVendors();

  const modalRef = useRef<IMVendorModalRef | null>(null);

  const {
    field: { onChange },
  } = useController({ control, name: "vendor_id" });
  //#endregion

  //#region Event
  const onCreateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    input?: string
  ) => {
    modalRef.current?.open(undefined, input);
  };

  const onGetCreatedData = (data: ICreatedVendorResponse) => {
    if (data) onChange(data.id);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Controller
        control={control}
        name="vendor_id"
        render={({ field, fieldState: { error } }) => (
          <CAutocomplete
            options={vendors}
            creatable
            onCreateClick={onCreateClick}
            error={!!error}
            placeholder="Chọn nhà cung cấp"
            {...field}
          />
        )}
      />

      <MVendorModal
        ref={modalRef}
        refetch={refetch}
        getSucceededData={onGetCreatedData}
      />
    </>
  );
  //#endregion
};
