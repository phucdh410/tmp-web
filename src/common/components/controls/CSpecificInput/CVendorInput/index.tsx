import { useRef } from "react";
import { Controller, Path, useController } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllVendors } from "@hooks/options";
import { ICreatedVendorResponse } from "@interfaces/vendors";
import { MVendorModal } from "@modules/vendor/components";
import { IMVendorModalRef } from "@modules/vendor/components/MVendorModal/types";

import { ICVendorInputProps, IVendorInput } from "./types";

export const CVendorInput = <T extends IVendorInput>({
  control,
}: ICVendorInputProps<T>) => {
  //#region Data
  const { vendors, refetch, loading } = useGetAllVendors();

  const modalRef = useRef<IMVendorModalRef>(null);

  const {
    field: { onChange },
  } = useController({ control, name: "vendor_id" as Path<T> });
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
        name={"vendor_id" as Path<T>}
        render={({ field, fieldState: { error } }) => (
          <CAutocomplete
            options={vendors}
            loading={loading}
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
