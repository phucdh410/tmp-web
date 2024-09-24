import { Controller, useWatch } from "react-hook-form";

import { CAutocomplete } from "@controls";
import { useGetAllRoomGroups } from "@hooks/options";

import { IMRoomGroupInputProps } from "./types";

export const MRoomGroupInput = ({ control }: IMRoomGroupInputProps) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { roomGroups } = useGetAllRoomGroups({ store_code });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="room_group_id"
      render={({ field, fieldState: { error } }) => (
        <CAutocomplete
          {...field}
          options={roomGroups}
          error={!!error}
          errorText={error?.message}
        />
      )}
    />
  );
  //#endregion
};
