import { Controller, useWatch } from "react-hook-form";

import { CInput } from "@controls";

import { IMNameInputProps } from "./types";

export const MNameInput = ({ control }: IMNameInputProps) => {
  //#region Data
  const code = useWatch({ control, name: "code" });
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="name"
      render={({ field }) => (
        <CInput placeholder="Mã tài sản" disabled={!!code} {...field} />
      )}
    />
  );
  //#endregion
};
