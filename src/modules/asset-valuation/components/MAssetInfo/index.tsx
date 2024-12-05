import { useContext } from "react";

import { assetValuationsApi } from "@apis/asset-valuations.api";
import { AssetValuationContext } from "@modules/asset-valuation/contexts";
import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { MDetailedInfo } from "./MDetailedInfo";
import { MPriceInfo } from "./MPriceInfo";

export const MAssetInfo = () => {
  //#region Data
  const { calculateParams } = useContext(AssetValuationContext);

  const { data } = useQuery({
    queryKey: [
      "chi-tiet-tai-san-dinh-gia",
      calculateParams.asset_id,
      calculateParams.valuation_value,
    ],
    queryFn: () =>
      assetValuationsApi.calculate({
        asset_id: calculateParams.asset_id,
        valuation_value: calculateParams.valuation_value,
      }),
    enabled: !!(calculateParams.asset_id !== -1),
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Render
  return (
    <>
      <Paper variant="tool-card" sx={{ p: 2, mb: 2 }}>
        <MPriceInfo data={data} />
      </Paper>
      <Paper variant="tool-card" sx={{ p: 2 }}>
        <MDetailedInfo data={data} />
      </Paper>
    </>
  );
  //#endregion
};
