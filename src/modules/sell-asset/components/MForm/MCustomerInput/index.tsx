import { Controller, useController } from "react-hook-form";

import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMCustomerInputProps } from "./types";

export const MCustomerInput = ({ control }: IMCustomerInputProps) => {
  //#region Data
  const { data: customers = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-khach-hang-mua"],
    queryFn: () => {},
    select: (response) => response?.data?.data,
  });

  const {
    field: { onChange: changeAddress },
  } = useController({ control, name: "address" });
  //#endregion

  //#region Event
  const onCustomerChange =
    (onChangeCallback: (...event: any[]) => void) =>
    (
      value: any,
      event?: React.SyntheticEvent,
      selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
    ) => {
      onChangeCallback(value);
      if ((selectedOption as IAutocompleteOption)?.address) {
        changeAddress((selectedOption as IAutocompleteOption).address);
      }
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="khach_hang_mua_id"
      render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
        <CAutocomplete
          options={customers}
          placeholder="Chọn khách hàng"
          onChange={onCustomerChange}
          {..._field}
          error={!!error}
        />
      )}
    />
  );
  //#endregion
};
