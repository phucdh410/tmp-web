import { Controller, useController, useWatch } from "react-hook-form";

import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";
import { CAutocomplete, CCheckbox } from "@controls";
import { useGetAllStores } from "@hooks/options";
import { Grid2 } from "@mui/material";
import { CFormInputWrapper, CFormLabel } from "@others";

import { IMStoreAndEmployeeInputProps } from "./types";

export const MStoreAndEmployeeInput = ({
  control,
  isEdit,
}: IMStoreAndEmployeeInputProps) => {
  //#region Data
  const { stores } = useGetAllStores();

  const transfer_type = useWatch({ control, name: "category" });
  const transfer_from = useWatch({ control, name: "transfer_from" });
  const transfer_to = useWatch({ control, name: "transfer_to" });
  const user_in_charge_from = useWatch({
    control,
    name: "user_in_charge_from",
  });

  const {
    field: { onChange: changeTransferTo },
  } = useController({ control, name: "transfer_to" });
  const {
    field: { onChange: changeTransferer },
  } = useController({ control, name: "user_in_charge_from" });
  const {
    field: { onChange: changeReceiver },
  } = useController({ control, name: "user_in_charge_to" });
  //#endregion

  //#region Event
  const onTransferTypeChange =
    (onChangeCallback: (...event: any[]) => void) => (newValue: boolean) => {
      onChangeCallback(newValue);
      if (newValue) {
        changeTransferTo("");
        changeReceiver("");
      } else {
        changeTransferTo(transfer_from);
        changeReceiver(user_in_charge_from);
      }
    };

  const onTransferFromChange =
    (onChangeCallback: (...event: any[]) => void) => (newValue: string) => {
      onChangeCallback(newValue);
      changeTransferer("");
      if (!transfer_type) {
        changeTransferTo(newValue);
        changeReceiver("");
      }
    };

  const onUserInChargeFromChange =
    (onChangeCallback: (...event: any[]) => void) => (newValue: string) => {
      onChangeCallback(newValue);
      if (!transfer_type) {
        changeReceiver(newValue);
      }
    };

  const onTransferToChange =
    (onChangeCallback: (...event: any[]) => void) => (newValue: string) => {
      onChangeCallback(newValue);
      changeReceiver("");
    };

  const getOptionDisabled = (option: IAutocompleteOption) => {
    return option.id === transfer_from || option.id === transfer_to;
  };
  //#endregion

  //#region Render
  return (
    <>
      <Grid2 size={1}>
        <CFormInputWrapper height="100%" percent={{ label: 35, input: 65 }}>
          <CFormLabel>Chuyển chi nhánh khác</CFormLabel>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, ..._field } }) => (
              <CCheckbox
                onChange={onTransferTypeChange(onChange)}
                {..._field}
                disabled={isEdit}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>Chi nhánh chuyển</CFormLabel>
          <Controller
            control={control}
            name="transfer_from"
            render={({ field: { onChange, ..._field } }) => (
              <CAutocomplete
                placeholder="Chọn chi nhánh chuyển"
                options={stores}
                {..._field}
                getOptionDisabled={getOptionDisabled}
                onChange={onTransferFromChange(onChange)}
                disabled={isEdit}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>Chi nhánh nhận</CFormLabel>
          <Controller
            control={control}
            name="transfer_to"
            render={({ field: { onChange, ..._field } }) => (
              <CAutocomplete
                placeholder="Chọn chi nhánh nhận"
                options={stores}
                {..._field}
                getOptionDisabled={getOptionDisabled}
                onChange={onTransferToChange(onChange)}
                disabled={isEdit || !transfer_type}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>
            NV phụ trách
            <br />
            tài sản chuyển
          </CFormLabel>
          <Controller
            control={control}
            name="user_in_charge_from"
            render={({ field: { onChange, ..._field } }) => (
              <CAutocomplete
                placeholder="Chọn nhân viên phụ trách"
                options={[]}
                {..._field}
                onChange={onUserInChargeFromChange(onChange)}
                disabled={isEdit}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
      <Grid2 size={1}>
        <CFormInputWrapper percent={{ label: 35, input: 65 }}>
          <CFormLabel required>
            NV phụ trách
            <br />
            tài sản nhận
          </CFormLabel>
          <Controller
            control={control}
            name="user_in_charge_to"
            render={({ field }) => (
              <CAutocomplete
                placeholder="Chọn nhân viên phụ trách"
                options={[]}
                {...field}
                disabled={isEdit || !transfer_type}
              />
            )}
          />
        </CFormInputWrapper>
      </Grid2>
    </>
  );
  //#endregion
};
