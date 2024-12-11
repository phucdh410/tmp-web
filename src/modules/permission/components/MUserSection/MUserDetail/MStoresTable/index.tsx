import { useContext, useRef } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { CONTROL_STATUS } from "@modules/permission/types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { UserSectionContext } from "../..";

import { IMStoresModalRef } from "./MStoresModal/types";
import { MStoresModal } from "./MStoresModal";

export const MStoresTable = () => {
  //#region Data
  const storesModalRef = useRef<IMStoresModalRef>(null);

  const { status } = useContext(UserSectionContext);
  //#endregion

  //#region Event
  const onAddStores = () => storesModalRef.current?.open();
  //#endregion

  //#region Render
  const headers: TCTableHeaders<any> = [
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
          onClick={onAddStores}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headerTransform="capitalize"
        headers={headers}
        data={[]}
        dense
      />
      <MStoresModal ref={storesModalRef} />
    </>
  );
  //#endregion
};
