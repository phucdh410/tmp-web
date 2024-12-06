import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { assetProposalsApi } from "@apis/asset-proposals.api";
import { MESSAGES, noti } from "@funcs/toast";
import {
  MAssetsTable,
  MInfo,
  MTrackingsTable,
} from "@modules/asset-proposal/components";
import { ASSET_PROPOSAL_LIST_PATH } from "@modules/asset-proposal/constants";
import { Stack } from "@mui/material";
import { CPageHeader } from "@others";
import { useQuery } from "@tanstack/react-query";

const AssetProposalDetailPage = () => {
  //#region Data
  const params = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-de-xuat-tai-san-ccdc", params?.id],
    queryFn: () => assetProposalsApi.getById(params.id!),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    return; //TODO: REMOVE THIS
    if (error) {
      noti.error(
        error?.message ?? MESSAGES("phiếu đề xuất tài sản").ERROR.GET_DETAIL
      );
      navigate(-1);
    }
  }, [error]);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack gap={3}>
      <CPageHeader back={ASSET_PROPOSAL_LIST_PATH}>
        xem đề xuất tài sản/CCDC
      </CPageHeader>

      <MInfo data={data} />
      <MAssetsTable data={data} />
      <MTrackingsTable data={data} />
    </Stack>
  );
  //#endregion
};
export default AssetProposalDetailPage;
