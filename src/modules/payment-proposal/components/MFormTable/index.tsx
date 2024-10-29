import { useRef } from "react";
import { useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";
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
  const onAdd = (newAsset: IAssetInPaymentProposalPayload) => {
    append(newAsset);
  };

  const onSave = (
    index: number,
    updatedAsset: IAssetInPaymentProposalPayload
  ) => {
    update(index, updatedAsset);
  };

  const onEdit =
    (index: number, editData: IAssetInPaymentProposalPayload) => () => {
      assetFormRef.current?.edit(index, editData);
    };

  const onRemove = (index: number) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInPaymentProposalPayload> = [
    {
      key: "asset_name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "code",
      label: "mã tài sản",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
    },
    {
      key: "price",
      label: "đơn giá",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
    },
    {
      key: "amount",
      label: "thành tiền",
      columnType: "number",
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
    {
      key: "action",
      label: "",
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
