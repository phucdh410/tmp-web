import { useContext, useRef } from "react";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IAreaInUserData } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@modules/permission/types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { UserSectionContext } from "../..";

import { IMRegionsModalRef } from "./MRegionsModal/types";
import { MRegionsModal } from "./MRegionsModal";
import { IMRegionsTableProps } from "./types";

export const MRegionsTable = ({ regions }: IMRegionsTableProps) => {
  //#region Data
  const regionsModalRef = useRef<IMRegionsModalRef>(null);

  const { status } = useContext(UserSectionContext);
  //#endregion

  //#region Event
  const onAddRegions = () => regionsModalRef.current?.open();
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAreaInUserData> = [
    {
      key: "code",
      label: "mã vùng",
    },
    {
      key: "name",
      label: "tên vùng",
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
          onClick={onAddRegions}
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
        height={450}
        headers={headers}
        data={regions}
        dense
      />
      <MRegionsModal ref={regionsModalRef} />
    </>
  );
  //#endregion
};
