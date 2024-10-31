import { Controller, useController } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete } from "@controls";
import { useQuery } from "@tanstack/react-query";

import { IMCodeInputProps } from "./types";

export const MCodeInput = ({ control }: IMCodeInputProps) => {
  //#region Data
  const { data: codes = [] } = useQuery({
    queryKey: ["danh-sach-toan-bo-tai-san"],
    queryFn: () => assetsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.code, label: e.name })),
  });

  const {
    field: { onChange: changeName },
  } = useController({ control, name: "name" });
  //#endregion

  //#region Event
  const onCodeChange =
    (onChangeCallback: (...event: any[]) => void) =>
    (
      value: number,
      event?: React.SyntheticEvent,
      selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
    ) => {
      onChangeCallback(value);
      changeName((selectedOption as IAutocompleteOption)?.label);
    };
  //#endregion

  //#region Render
  return (
    <Controller
      control={control}
      name="code"
      render={({ field: { onChange, ..._field } }) => (
        <CAutocomplete
          options={codes}
          display="id"
          placeholder="Mã tài sản"
          onChange={onCodeChange(onChange)}
          disableClearable={false}
          {..._field}
        />
      )}
    />
  );
  //#endregion
};
