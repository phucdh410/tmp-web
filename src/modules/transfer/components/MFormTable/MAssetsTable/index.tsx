import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CNumberInput } from "@controls";
import { IAssetInTransferPayload } from "@interfaces/transfers";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { MAssetRegionCell } from "./MAssetRegionCell";
import { MAssetSelectionCell } from "./MAssetSelectionCell";
import { IMAssetsTableProps } from "./types";

export const MAssetsTable = ({
  control,
  isEdit,
  setValue,
}: IMAssetsTableProps) => {
  //#region Data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = () =>
    append({
      code: "",
      quantity: 1,
      depreciation_accumulation: 0,
      depreciation_amount: 0,
      depreciation_duration: 0,
      original_price: 0,
      region_id: 0,
      remaining_original_price: 0,
    });

  const onRemove = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInTransferPayload> = [
    {
      key: "region_id",
      label: "vùng tài sản",
      width: 300,
      cellRender: (value, record, index) => (
        <MAssetRegionCell control={control} index={index} />
      ),
    },
    {
      key: "code",
      label: "mã tài sản",
      width: 300,
      cellRender: (value, record, index) => (
        <MAssetSelectionCell
          control={control}
          index={index}
          setValue={setValue}
          display="code"
        />
      ),
    },
    {
      key: "name",
      label: "tên tài sản",
      width: 300,
      cellRender: (value, record, index) => (
        <MAssetSelectionCell
          control={control}
          index={index}
          setValue={setValue}
          display="label"
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
      key: "original_price",
      label: "đơn giá",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.original_price`}
          render={({ field }) => <div>{field.value}</div>}
        />
      ),
    },
    {
      key: "remaining_original_price",
      label: "đơn giá\ncòn lại",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}`}
          render={({ field }) => (
            <>
              {(field.value.quantity * (field.value.original_price ?? 0) -
                (field.value.depreciation_accumulation ?? 0)) /
                (field.value.quantity ?? 1)}
            </>
          )}
        />
      ),
    },
    {
      key: "depreciation_duration",
      label: "thời gian\ncòn KH",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.depreciation_duration`}
          render={({ field }) => <div>{field.value} Tháng</div>}
        />
      ),
    },
    {
      key: "depreciation_amount",
      label: "giá trị KH\ncòn lại",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}`}
          render={({ field }) => (
            <>
              {field.value.quantity * (field.value.original_price ?? 0) -
                (field.value.depreciation_accumulation ?? 0)}
            </>
          )}
        />
      ),
    },
    {
      key: "action",
      label: "",
      pin: "right",
      width: 50,
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
