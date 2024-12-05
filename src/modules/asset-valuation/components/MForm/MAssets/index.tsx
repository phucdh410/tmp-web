import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup, CInput, CNumberInput } from "@controls";
import { IAssetInAssetValuationPayload } from "@interfaces/asset-valuations";
import { Stack } from "@mui/material";
import { CTable } from "@others";

import { MAddAsset } from "./MAddAsset";
import { IMAssetsProps } from "./types";

export const MAssets = ({ control }: IMAssetsProps) => {
  //#region Data
  const { fields, append } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAddNewAsset = (newAsset: IAssetInAssetValuationPayload) =>
    append(newAsset);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInAssetValuationPayload> = [
    {
      key: "code",
      label: "mã tài sản",
    },
    { key: "name", label: "tên tài sản", align: "left", width: 300 },
    {
      key: "valuation_value",
      label: "định giá tài sản",
      width: 200,
      columnType: "input",
      align: "right",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.valuation_value`}
          render={({ field }) => <CNumberInput {...field} />}
        />
      ),
    },
    {
      key: "valuation_note",
      label: "ghi chú định giá",
      columnType: "input",
      align: "left",
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`assets.${index}.valuation_note`}
          render={({ field }) => <CInput {...field} />}
        />
      ),
    },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <CButtonGroup variant="text">
          <CButton>Xem thông tin định giá</CButton>
          <CButton color="error">Xóa</CButton>
        </CButtonGroup>
      ),
    },
  ];
  return (
    <Stack gap={2} minWidth={460} flex={1}>
      <MAddAsset onAddNewAsset={onAddNewAsset} />

      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={fields}
        dense
        rowKey="__id"
      />
    </Stack>
  );
  //#endregion
};
