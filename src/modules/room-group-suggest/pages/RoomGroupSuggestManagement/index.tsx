import { ICTableHeader } from "@components/others/CTable/types";
import { useTitle } from "@hooks/title";
import { IRoomGroupSuggest } from "@interfaces/room-group-suggests";
import { Typography } from "@mui/material";
import { CTable } from "@others";

const RoomGroupSuggestManagement = () => {
  useTitle("Quản lý đề xuất nhóm phòng");

  //#region Render
  const headers: ICTableHeader<IRoomGroupSuggest> = [];
  return (
    <>
      <Typography variant="header-page">quản lý đề xuất nhóm phòng</Typography>
      <CTable headers={headers} />
    </>
  );
  //#endregion
};
export default RoomGroupSuggestManagement;
