import { TCTableHeaders } from "@components/others/CTable/types";
import { Checkbox } from "@mui/material";
import { CTable } from "@others";

import { IMReportsTableProps } from "./types";

export const MReportsTable = ({ reports }: IMReportsTableProps) => {
  const headers: TCTableHeaders<any> = [
    { key: "name", label: "chức năng", align: "left" },
    {
      key: "view",
      label: "xem",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "export",
      label: "export",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "delete",
      label: "xóa",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      headers={headers}
      data={reports}
      dense
    />
  );
};
