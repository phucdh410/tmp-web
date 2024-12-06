import { ICTableHeader, TCTableHeaders } from "@components/others/CTable/types";
import { ASSET_PROPOSAL_TRACKING_STATUSES } from "@constants/enums";
import { ITrackingInAssetProposalDetail } from "@interfaces/asset-proposals";
import { Check, Close } from "@mui/icons-material";
import { CTable } from "@others";

import { IMDetailProps } from "../types";

export const MTrackingsTable = ({ data }: IMDetailProps) => {
  const headers: TCTableHeaders<ITrackingInAssetProposalDetail> = [
    {
      key: "approved_date",
      label: "thời gian duyệt",
      columnType: "datetime",
    },
    {
      key: "approver_name",
      label: "người duyệt",
      align: "left",
    },
    {
      key: "approval_hour",
      label: "thời gian QĐ",
      cellRender: (value, record, index) => <>{value}h</>,
    },
    {
      key: "hours",
      label: "thời gian thực tế",
      cellRender: (value, record, index) => <>{value}h</>,
    },
    ...(data?.trackings && data.trackings?.length > 0
      ? data.trackings.map(
          (e, colIndex) =>
            ({
              key: e.label,
              label: e.label,
              cellRender: (value, record, index) =>
                colIndex === index ? (
                  record?.status ===
                  ASSET_PROPOSAL_TRACKING_STATUSES.APPROVED ? (
                    <Check color="success" />
                  ) : record?.status ===
                    ASSET_PROPOSAL_TRACKING_STATUSES.LATE_APPROVED ? (
                    <Check color="warning" />
                  ) : record?.status ===
                    ASSET_PROPOSAL_TRACKING_STATUSES.REJECTED ? (
                    <Close color="error" />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                ),
            } as ICTableHeader<ITrackingInAssetProposalDetail>)
        )
      : []),
  ];
  return (
    <CTable
      showIndexCol={false}
      title="Theo dõi thời gian duyệt"
      headerTransform="capitalize"
      headers={headers}
      dense
      data={data?.trackings ?? []}
    />
  );
};
