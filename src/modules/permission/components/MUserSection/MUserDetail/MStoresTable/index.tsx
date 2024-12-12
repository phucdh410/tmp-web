import { useContext, useRef } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IStoreInUserDataPayload } from "@interfaces/permissions";
import { IStoreResponse } from "@interfaces/stores";
import { CONTROL_STATUS } from "@modules/permission/types";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { UserSectionContext } from "../..";

import { IMStoresModalRef } from "./MStoresModal/types";
import { MStoresModal } from "./MStoresModal";
import { IMStoresTableProps } from "./types";

export const MStoresTable = ({ control }: IMStoresTableProps) => {
  //#region Data
  const storesModalRef = useRef<IMStoresModalRef>(null);

  const { status } = useContext(UserSectionContext);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "store_ids",
    keyName: "__id",
  });

  const store_ids = useWatch({ control, name: "store_ids" });
  //#endregion

  //#region Event
  const openAddStoresModal = () => storesModalRef.current?.open();

  const onRemove = (index: number) => () => remove(index);

  const onAddStores = (addedStores: IStoreResponse[]) => {
    const result: IStoreInUserDataPayload[] = addedStores.map((e) => ({
      code: e.code,
      name: e.name,
      store_id: e?.databaseId!,
    }));
    append(result);
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IStoreInUserDataPayload> = [
    {
      key: "code",
      label: "mã chi nhánh",
    },
    {
      key: "name",
      label: "tên chi nhánh",
      align: "left",
    },
    {
      key: "action",
      label: "",
      width: 70,
      style: { padding: 0 },
      render: () => (
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="white"
          size="small"
          onClick={openAddStoresModal}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
      cellRender: (value, record, index) => (
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="error"
          size="small"
          onClick={onRemove(index)}
        >
          <Close />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headerTransform="capitalize"
        height={450}
        headers={headers}
        data={fields}
        dense
        rowKey="__id"
      />
      <MStoresModal
        ref={storesModalRef}
        existingStores={store_ids}
        onAddStores={onAddStores}
      />
    </>
  );
  //#endregion
};
