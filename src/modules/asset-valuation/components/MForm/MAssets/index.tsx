import { useContext } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CButton, CButtonGroup, CInput, CNumberInput } from "@controls";
import { IAssetInAssetValuationPayload } from "@interfaces/asset-valuations";
import { AssetValuationContext } from "@modules/asset-valuation/contexts";
import { Stack } from "@mui/material";
import { CTable } from "@others";

import { MAddAsset } from "./MAddAsset";
import { IMAssetsProps } from "./types";

export const MAssets = ({ control }: IMAssetsProps) => {
  //#region Data
  const { setCalculateParams } = useContext(AssetValuationContext);

  const { fields, append } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });

  const store_code = useWatch({ control, name: "store_code" });
  //#endregion

  //#region Event
  const onAddNewAsset = (newAsset: IAssetInAssetValuationPayload) =>
    append(newAsset);

  const onCalculate = (rowData: IAssetInAssetValuationPayload) => () => {
    setCalculateParams({
      asset_id: rowData.asset_id,
      valuation_value: rowData.valuation_value,
    });
  };
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
        <Controller
          control={control}
          name={`assets.${index}`}
          render={({ field }) => (
            <CButtonGroup variant="text">
              <CButton onClick={onCalculate(field.value)}>
                Xem thông tin định giá
              </CButton>
              <CButton color="error">Xóa</CButton>
            </CButtonGroup>
          )}
        />
      ),
    },
  ];
  return (
    <Stack gap={2} minWidth={460} flex={1}>
      <MAddAsset onAddNewAsset={onAddNewAsset} store_code={store_code} />

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
