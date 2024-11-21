import { Controller, useForm } from "react-hook-form";

import { CButton, CInput } from "@controls";
import { Stack } from "@mui/material";

import { IMSearchProps } from "./types";

export const MSearch = ({ onSearch }: IMSearchProps) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: { code: "", name: "" },
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit((values) => {
      onSearch(values);
    })();
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="row" gap={2}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <CInput {...field} placeholder="Tìm kiếm theo mã TS" />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <CInput {...field} placeholder="Tìm kiếm theo tên TS" />
        )}
      />
      <CButton sx={{ flexShrink: 0 }} onClick={onSubmit}>
        Tìm kiếm
      </CButton>
    </Stack>
  );
  //#endregion
};
