import { useMemo, useRef, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { regionsApi } from "@apis/regions.api";
import { TCTableHeaders } from "@components/others/CTable/types";
import { STOCKTAKE_QUALITIES } from "@constants/enums";
import { STOCKTAKE_QUALITIES_OPTIONS } from "@constants/options";
import { CAutocomplete, CButton, CButtonGroup } from "@controls";
import { IAssetInAll } from "@interfaces/assets";
import { IAssetInInventoryPayload } from "@interfaces/inventories";
import { AddCircleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CFormInputWrapper, CFormLabel, CTable } from "@others";
import { useQuery } from "@tanstack/react-query";

import { IMAssetsSelectionModalRef } from "./MAssetsSelectionModal/types";
import { MAssetsSelectionModal } from "./MAssetsSelectionModal";
import { MEditAssetInfo } from "./MEditAssetInfo";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const selectionModalRef = useRef<IMAssetsSelectionModalRef>(null);

  const store_code = useWatch({ control, name: "store_code" });

  const { data: regions = [] } = useQuery({
    queryKey: ["danh-sach-vi-tri-theo-chi-nhanh", store_code],
    queryFn: () => regionsApi.getAll({ store_code }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({ id: e.id, label: e.name })),
  });

  const [regionId, setRegionId] = useState<"" | number>("");

  const { fields, replace, remove, update } = useFieldArray({
    control,
    name: "stocktake_assets",
    keyName: "__id",
  });

  const assetsValue = useWatch({ control, name: "stocktake_assets" });

  const filteredAssets = useMemo(() => {
    if (!regionId) return fields;
    else return fields.filter((e) => e.region_id === regionId) ?? [];
  }, [fields, regionId]);
  //#endregion

  //#region Event
  const onRegionChange = (newValue: any) => setRegionId(newValue);

  const onOpenAddModal = () => selectionModalRef.current?.open();

  const onSaveAssets = (newAssets: IAssetInAll[]) => {
    const initAssets = new Map(assetsValue.map((e) => [e.asset_code, e]));

    const result: IAssetInInventoryPayload[] = newAssets.map((e) =>
      initAssets.has(e.code)
        ? (initAssets.get(e.code) as IAssetInInventoryPayload)!
        : ({
            asset_id: e?.id,
            note: "",
            quality: STOCKTAKE_QUALITIES.WELL,
            recommend: "",
            region_id: e?.region_id,
            stocktake_quantity: 1,
            asset_code: e?.code,
            asset_name: e?.name,
            depreciation_accumulation: e?.depreciation_amount,
            original_price: e?.original_price,
            quantity: e?.quantity,
            region_name: e?.region_name,
          } as IAssetInInventoryPayload)
    );

    replace(result);
  };

  const onRemoveAsset = (index: number) => () => remove(index);
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInInventoryPayload> = [
    {
      key: "asset_code",
      label: "mã tài sản",
      align: "left",
    },
    {
      key: "asset_name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "region_name",
      label: "vị trí",
      align: "left",
    },
    {
      key: "quantity",
      label: "số lượng\nsổ sách",
      align: "right",
      columnType: "number",
    },
    {
      key: "original_price",
      label: "nguyên giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "gia_tri_con_lai",
      label: "giá trị\ncòn lại",
      align: "right",
      cellRender: (value, record, index) => (
        <>
          {(
            (record?.quantity ?? 0) * (record?.original_price ?? 0) -
            (record?.depreciation_accumulation ?? 0)
          ).toLocaleString()}
        </>
      ),
    },
    {
      key: "stocktake_quantity",
      label: "số lượng\nkiểm kê",
      align: "right",
      columnType: "number",
    },
    {
      key: "quality",
      label: "chất lượng",
      columnType: "option",
      options: STOCKTAKE_QUALITIES_OPTIONS,
    },
    {
      key: "recommend",
      label: "kiến nghị\nxử lý",
    },
    {
      key: "note",
      label: "ghi chú",
      align: "left",
    },
    {
      key: "action",
      label: "",
      render: () => (
        <IconButton onClick={onOpenAddModal} sx={{ color: "#ffffff" }}>
          <AddCircleOutline sx={{ color: "inherit" }} />
        </IconButton>
      ),
      cellRender: (value, record, index) => (
        <CButtonGroup className="table-actions" variant="text">
          <MEditAssetInfo data={record} update={update} index={index} />
          <CButton color="error" onClick={onRemoveAsset(index)}>
            Xóa
          </CButton>
        </CButtonGroup>
      ),
    },
  ];
  return store_code ? (
    <>
      <CFormInputWrapper
        percent={{ label: 20, input: 80 }}
        maxWidth={450}
        px={4}
        mb={2}
      >
        <CFormLabel>Vị trí</CFormLabel>
        <CAutocomplete
          options={regions}
          optionAll
          value={regionId}
          onChange={onRegionChange}
        />
      </CFormInputWrapper>
      <CTable
        showIndexCol={false}
        rowKey="__id"
        headers={headers}
        data={filteredAssets}
        headerTransform="capitalize"
        headerMultiline
      />

      <MAssetsSelectionModal
        ref={selectionModalRef}
        store_code={store_code}
        onGetAssets={onSaveAssets}
      />
    </>
  ) : null;
  //#endregion
};
