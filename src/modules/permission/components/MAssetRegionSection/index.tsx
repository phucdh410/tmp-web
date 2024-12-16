import { createContext, useRef, useState } from "react";

import { confirm } from "@funcs/confirm";
import { MESSAGES, noti } from "@funcs/toast";
import { useTitle } from "@hooks/title";
import { CONTROL_STATUS, IControlContext } from "@modules/permission/types";
import { Stack } from "@mui/material";

import { IMAssetRegionDetailRef } from "./MAssetRegionDetail/types";
import { MAssetRegionDetail } from "./MAssetRegionDetail";
import { IMAssetRegionsListRef, MAssetRegionsList } from "./MAssetRegionsList";
import { MToolbar } from "./MToolbar";

export const AssetRegionSectionContext = createContext<IControlContext>({
  status: CONTROL_STATUS.IDLE,
  setStatus: () => {},
  id: "",
  setId: () => {},
});

export const MAssetRegionSection = () => {
  //#region Data
  useTitle("Phân quyền vùng tài sản");

  const assetRegionsListRef = useRef<IMAssetRegionsListRef>(null);
  const assetRegionDetailRef = useRef<IMAssetRegionDetailRef>(null);

  const [status, setStatus] = useState<CONTROL_STATUS>(CONTROL_STATUS.IDLE);
  const [id, setId] = useState<string | number>("");
  //#endregion

  //#region Event
  const onEdit = () => setStatus(CONTROL_STATUS.EDITING);

  const onCancel = () => {
    confirm({
      title: "Xác nhận",
      content: "Hủy bỏ các thay đổi đã điều chỉnh?",
      onProceed: () => {
        assetRegionDetailRef.current?.reset();
        setStatus(CONTROL_STATUS.VIEWING);
      },
    });
  };

  const onSave = async () => {
    try {
      await assetRegionDetailRef.current?.submit();
      assetRegionDetailRef.current?.refetch();
      noti.success(MESSAGES("thông tin vùng tài sản").SUCCESS.UPDATE);
      setStatus(CONTROL_STATUS.VIEWING);
    } catch (error: any) {
      noti.error(
        error?.message ?? MESSAGES("thông tin vùng tài sản").ERROR.UPDATE
      );
    }
  };
  //#endregion

  //#region Render
  return (
    <AssetRegionSectionContext.Provider
      value={{ status, setStatus, id, setId }}
    >
      <MToolbar
        status={status}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
      />

      <Stack direction="row" gap={3}>
        <MAssetRegionsList ref={assetRegionsListRef} />

        <MAssetRegionDetail ref={assetRegionDetailRef} />
      </Stack>
    </AssetRegionSectionContext.Provider>
  );
  //#endregion
};
