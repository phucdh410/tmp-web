import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CNumberInput } from "@controls";
import { IAssetInLiquidatePayload } from "@interfaces/liquidates";
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
  const onAdd = () => append({ code: "", quantity: 1 });

  const onRemove = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInLiquidatePayload> = [
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
      key: "location",
      label: "vị trí tài sản",
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
      key: "remaining_price",
      label: "giá trị còn\nkhấu hao",
      columnType: "number",
    },
    {
      key: "depreciation_time",
      label: "thời gian còn\nkhấu hao",
    },
    {
      key: "amount",
      label: "giá trị\ntài sản",
      columnType: "number",
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
