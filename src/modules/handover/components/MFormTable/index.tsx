import { useRef } from "react";
import { useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IAssetInHandoverPayload } from "@interfaces/handovers";
import { DeleteForever, Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CTable } from "@others";

import { IMAssetFormRef } from "./MAssetForm/types";
import { MAssetForm } from "./MAssetForm";
import { IMFormTableProps } from "./types";

export const MFormTable = ({ control }: IMFormTableProps) => {
  //#region Data
  const assetFormRef = useRef<IMAssetFormRef>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "assets",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAdd = (newAsset: IAssetInHandoverPayload) => {
    append(newAsset);
  };

  const onSave = (index: number, updatedAsset: IAssetInHandoverPayload) => {
    update(index, updatedAsset);
  };

  const onEdit = (index: number, editData: IAssetInHandoverPayload) => () => {
    assetFormRef.current?.edit(index, editData);
  };

  const onRemove = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInHandoverPayload> = [
    {
      key: "asset_name",
      label: "tài sản bàn giao",
      align: "left",
    },
    {
      key: "asset_code",
      label: "mã tài sản",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "reason",
      label: "lý do bàn giao",
      align: "left",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
    {
      key: "action",
      label: "thao tác",
      cellRender: (value, record, index) => (
        <Stack direction="row" gap={1} justifyContent="center">
          <IconButton
            size="small"
            color="primary"
            onClick={onEdit(index, record)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onRemove(index)}>
            <DeleteForever fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <MAssetForm ref={assetFormRef} onAdd={onAdd} onSave={onSave} />
      <CTable
        showIndexCol={false}
        headers={headers}
        headerTransform="capitalize"
        data={fields}
        rowKey="__id"
        sx={{ my: 3 }}
      />
    </>
  );
  //#endregion
};
