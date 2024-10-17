import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CAutocomplete, CButton, CNumberInput } from "@controls";
import { IAssetInTransferPayload } from "@interfaces/transfers";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { IMAssetsTableProps } from "./types";

export const MAssetsTable = ({ control, isEdit }: IMAssetsTableProps) => {
  //#region Data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = () => append({ code: "", quantity: 1 });

  const onRemove = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInTransferPayload> = [
    {
      key: "code",
      label: "mã tài sản",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.code`}
          render={({ field, fieldState: { error } }) => (
            <CAutocomplete
              {...field}
              display="code"
              error={!!error}
              placeholder="Chọn tài sản"
              options={[]}
            />
          )}
        />
      ),
    },
    {
      key: "name",
      label: "tên tài sản",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.code`}
          render={({ field, fieldState: { error } }) => (
            <CAutocomplete
              {...field}
              error={!!error}
              placeholder="Chọn tài sản"
              options={[]}
            />
          )}
        />
      ),
    },
    {
      key: "quantity",
      label: "số lượng",
      width: 120,
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.quantity`}
          render={({ field, fieldState: { error } }) => (
            <CNumberInput {...field} error={!!error} />
          )}
        />
      ),
    },
    {
      key: "price",
      label: "đơn giá",
      columnType: "number",
    },
    {
      key: "remaining_price",
      label: "đơn giá\ncòn lại",
      columnType: "number",
    },
    {
      key: "depreciation_time",
      label: "thời gian\ncòn KH",
    },
    {
      key: "depreciation_remaining_amount",
      label: "giá trị KH\ncòn lại",
    },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <IconButton color="error" onClick={onRemove(index)}>
          <DeleteForever />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headerTransform="capitalize"
        rowKey="__id"
        headers={headers}
        data={fields}
      />
      <CButton
        onClick={onAdd}
        sx={{ mb: 3, justifyContent: "start", width: "100%" }}
      >
        + Thêm tài sản
      </CButton>
    </>
  );
  //#endregion
};
