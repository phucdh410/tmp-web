import { TCTableHeaders } from "@components/others/CTable/types";
import { IAssetInAssetProposalDetail } from "@interfaces/asset-proposals";
import { CTable } from "@others";

import { IMDetailProps } from "../types";

export const MAssetsTable = ({ data }: IMDetailProps) => {
  const headers: TCTableHeaders<IAssetInAssetProposalDetail> = [
    {
      key: "asset_name",
      label: "tài sản bàn giao",
      align: "left",
    },
    {
      key: "asset_code",
      label: "mã tài sản",
      align: "left",
    },
    {
      key: "quantity",
      label: "số lượng",
      columnType: "number",
      align: "right",
      width: 80,
    },
    {
      key: "price",
      label: "đơn giá",
      align: "right",
      columnType: "number",
    },
    {
      key: "unit",
      label: "đơn vị tính",
      cellRender: () => <>Cái</>,
    },
    {
      key: "total",
      label: "thành tiền",
      align: "right",
      cellRender: (value, record, index) => (
        <>{(record.quantity * record.price)?.toLocaleString()}</>
      ),
    },
    {
      key: "note",
      label: "Mô tả",
      align: "left",
      isMultilineCell: true,
      width: 250,
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      title="Danh sách CCDC/Tài sản nghiệm thu"
      headerTransform="capitalize"
      dense
      headers={headers}
      data={data?.assets ?? []}
    />
  );
};
