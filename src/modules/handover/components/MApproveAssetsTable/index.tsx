import { TCTableHeaders } from "@components/others/CTable/types";
import { IAssetInHandoverDetail } from "@interfaces/handovers";
import { Check, Close } from "@mui/icons-material";
import { CTable } from "@others";
import dayjs from "dayjs";

import { IMApproveAssetsTableProps } from "./types";

export const MApproveAssetsTable = ({ data }: IMApproveAssetsTableProps) => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IAssetInHandoverDetail> = [
    {
      key: "asset_code",
      label: "mã tài sản",
    },
    {
      key: "asset_name",
      label: "tên tài sản",
      align: "left",
    },
    {
      key: "handover_date",
      label: "ngày bàn giao",
      cellRender: (value, record, index) => (
        <>{dayjs(data?.date).format("DD/MM/YYYY")}</>
      ),
    },
    {
      key: "handover_user",
      label: "người bàn giao",
      align: "left",
      cellRender: (value, record, index) => <>{data?.handover_user.name}</>,
    },
    {
      key: "receiver",
      label: "người nhận bàn giao",
      align: "left",
      cellRender: (value, record, index) => <>{data?.receiver_user.name}</>,
    },
    {
      key: "description",
      label: "mô tả",
      align: "left",
    },
    {
      key: "receiver_store_approval",
      label: "chi nhánh nhận",
      cellRender: (value, record, index) => (
        <>
          {value === null ? (
            ""
          ) : value ? (
            <Check color="success" />
          ) : (
            <Close color="error" />
          )}
        </>
      ),
    },
    {
      key: "tbp_tai_san_approval",
      label: "TBP tài sản",
      cellRender: (value, record, index) => (
        <>
          {value === null ? (
            ""
          ) : value ? (
            <Check color="success" />
          ) : (
            <Close color="error" />
          )}
        </>
      ),
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headers={headers}
      headerTransform="capitalize"
      data={data?.assets ?? []}
    />
  );
  //#endregion
};
