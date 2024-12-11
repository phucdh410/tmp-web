import { createContext, useState } from "react";

import { useTitle } from "@hooks/title";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { MAssetRegionDetail } from "./MAssetRegionDetail";
import { MAssetRegionsList } from "./MAssetRegionsList";
import { MToolbar } from "./MToolbar";

export const AssetRegionSectionContext = createContext({
  status: CONTROL_STATUS.IDLE,
  setStatus: (newStatus: CONTROL_STATUS) => {},
});

export const MAssetRegionSection = () => {
  //#region Data
  useTitle("Phân quyền vùng tài sản");

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  //#endregion

  //#region Render
  return (
    <AssetRegionSectionContext.Provider value={{ status, setStatus }}>
      <MToolbar status={status} />

      <Stack direction="row" gap={3}>
        <MAssetRegionsList />

        <MAssetRegionDetail />
      </Stack>
    </AssetRegionSectionContext.Provider>
  );
  //#endregion
};
