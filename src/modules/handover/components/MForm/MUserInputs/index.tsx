import { Controller, useWatch } from "react-hook-form";

import { outsidesApi } from "@apis/outsides.api";
import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete } from "@controls";
import { Grid2 } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMUserInputsProps } from "./types";

export const MUserlInputs = ({ control }: IMUserInputsProps) => {
  //#region Data
  const handover_user = useWatch({ control, name: "handover_user" });
  const receiver_user = useWatch({ control, name: "receiver_user" });

  const { data: users = [] } = useQuery({
    queryKey: ["danh-sach-nhan-vien-tai-san"],
    queryFn: () => outsidesApi.getAllUsers(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e?.code, label: e?.name })),
  });
  //#endregion

  //#region Event
  const getOptionDisabled = (option: IAutocompleteOption): boolean => {
    if (option.id === receiver_user || option.id === handover_user) {
      return true;
    }
    return false;
  };
  //#endregion

  //#region Render
  return (
    <>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>Người bàn giao</CFormLabel>
          <Controller
            control={control}
            name="handover_user"
            render={({ field, fieldState: { error } }) => (
              <CAutocomplete
                placeholder="Chọn người bàn giao"
                options={users}
                getOptionDisabled={getOptionDisabled}
                {...field}
                isDirtyOptions
                error={!!error}
                errorText={error?.message}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>
            Người nhận
            <br />
            bàn giao
          </CFormLabel>
          <Controller
            control={control}
            name="receiver_user"
            render={({ field, fieldState: { error } }) => (
              <CAutocomplete
                placeholder="Chọn người nhận bàn giao"
                options={users}
                getOptionDisabled={getOptionDisabled}
                {...field}
                isDirtyOptions
                error={!!error}
                errorText={error?.message}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
    </>
  );
  //#endregion
};
