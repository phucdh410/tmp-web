import { TCTableHeaders } from "@components/others/CTable/types";
import { Checkbox } from "@mui/material";
import { CTable } from "@others";

import { IMFunctionsTableProps } from "./types";

export const MFunctionsTable = ({ features }: IMFunctionsTableProps) => {
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
      key: "print",
      label: "in",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "add",
      label: "thêm",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "update",
      label: "sửa",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "delete",
      label: "xóa",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
    {
      key: "confirm",
      label: "xác nhận",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => <Checkbox />,
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      headers={headers}
      data={features}
      dense
    />
  );
};
