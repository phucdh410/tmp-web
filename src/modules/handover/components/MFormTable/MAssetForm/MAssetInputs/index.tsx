import { Controller } from "react-hook-form";

import { assetsApi } from "@apis/assets.api";
import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CInput } from "@controls";
import { Grid2 } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAssetInputsProps } from "./types";

export const MAssetInputs = ({ control, setValue }: IMAssetInputsProps) => {
  //#region Data
  const { data: assets = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-tai-san"],
    queryFn: () => assetsApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        id: e?.id,
        label: e?.name,
        code: e?.code,
      })),
  });
  //#endregion

  //#region Event
  const onSelectAsset =
    (onChangeCallback: (...event: any[]) => void) =>
    (
      value: any,
      event?: React.SyntheticEvent<Element, Event>,
      selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null
    ) => {
      onChangeCallback(value);
      setValue("asset_code", (selectedOption as IAutocompleteOption)?.code);
      setValue("asset_name", (selectedOption as IAutocompleteOption)?.label);
    };
  //#endregion

  //#region Render
  return (
    <>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>Tên tài sản</CFormLabel>
          <Controller
            control={control}
            name="asset_name"
            render={({ field }) => (
              <CInput {...field} placeholder="Tên tài sản" />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel>Mã tài sản</CFormLabel>
          <Controller
            control={control}
            name="asset_code"
            render={({ field }) => (
              <CInput placeholder="Mã tài sản" {...field} />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
    </>
  );

  //#endregion
};

{
  /* <Controller
  control={control}
  name="asset_id"
  render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
    <CAutocomplete
      placeholder="Chọn tài sản bàn giao"
      options={assets}
      onChange={onSelectAsset(onChange)}
      {..._field}
      isDirtyOptions
      error={!!error}
      errorText={error?.message}
      virtual
    />
  )}
/>; */
}

// <Controller
// control={control}
// name="asset_id"
// render={({ field, fieldState: { error } }) => (
//   <CAutocomplete
//     placeholder="Chọn tài sản bàn giao"
//     options={assets}
//     display="code"
//     {...field}
//     isDirtyOptions
//     error={!!error}
//     errorText={error?.message}
//     virtual
//   />
// )}/>
