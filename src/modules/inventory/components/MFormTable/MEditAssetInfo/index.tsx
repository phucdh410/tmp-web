import { useRef } from "react";

import { CButton } from "@controls";

import { MAssetInfoModal } from "../MAssetInfoModal";
import { IMAssetInfoModalRef } from "../MAssetInfoModal/types";

import { IMEditAssetInfoProps } from "./types";

export const MEditAssetInfo = ({
  data,
  update,
  index,
}: IMEditAssetInfoProps) => {
  //#region Data
  const infoModalRef = useRef<IMAssetInfoModalRef>(null);
  //#endregion

  //#region Event
  const onOpenModal = () => infoModalRef.current?.open();
  //#endregion

  //#region Render
  return (
    <>
      <CButton onClick={onOpenModal}>Sửa</CButton>
      <MAssetInfoModal
        ref={infoModalRef}
        data={data}
        update={update}
        index={index}
      />
    </>
  );
  //#endregion
};
