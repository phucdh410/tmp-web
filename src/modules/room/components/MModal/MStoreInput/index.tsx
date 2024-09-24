import { Controller, useController } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllStores } from "@hooks/options";

import { IMStoreInputProps } from "./types";

export const MStoreInput = ({ control }: IMStoreInputProps) => {
  //#region Data
  const { stores } = useGetAllStores();

  const {
    field: { onChange: changeRegionIdValue },
  } = useController({ control, name: "region_id" });
  const {
    field: { onChange: changeRoomGroupIdValue },
  } = useController({ control, name: "room_group_id" });
  //#endregion

  //#region Event
  const onStoreCodeChange =
    (callbackChange: (value: string) => void) => (selectedValue: string) => {
      callbackChange(selectedValue);
      changeRegionIdValue(-1);
      changeRoomGroupIdValue(-1);
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="store_code"
      render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
        <CAutocomplete
          {..._field}
          onChange={onStoreCodeChange(onChange)}
          options={stores}
          error={!!error}
          errorText={error?.message}
        />
      )}
    />
  );
  //#endregion
};
