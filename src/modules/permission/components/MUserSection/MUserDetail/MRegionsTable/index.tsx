import { TCTableHeaders } from "@components/others/CTable/types";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

export const MRegionsTable = () => {
  const headers: TCTableHeaders<any> = [
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
        <IconButton color="white" size="small">
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      headers={headers}
      data={[]}
      dense
    />
  );
};
