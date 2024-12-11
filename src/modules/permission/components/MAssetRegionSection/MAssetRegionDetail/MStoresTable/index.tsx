import { TCTableHeaders } from "@components/others/CTable/types";
import { CONTROL_STATUS } from "@modules/permission/types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

export const MStoresTable = () => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  const headers: TCTableHeaders<any> = [
    { key: "code", label: "mã chi nhánh" },
    { key: "name", label: "tên chi nhánh", align: "left" },
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
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headers={headers}
      headerTransform="capitalize"
      data={[]}
      dense
    />
  );
  //#endregion
};
