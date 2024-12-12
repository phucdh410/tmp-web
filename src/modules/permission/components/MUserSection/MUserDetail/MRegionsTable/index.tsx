import { useContext, useRef } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IArea, IAreaInUserDataPayload } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@modules/permission/types";
import { AddCircleOutlineOutlined, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CTable } from "@others";

import { UserSectionContext } from "../..";

import { IMRegionsModalRef } from "./MRegionsModal/types";
import { MRegionsModal } from "./MRegionsModal";
import { IMRegionsTableProps } from "./types";

export const MRegionsTable = ({ control }: IMRegionsTableProps) => {
  //#region Data
  const regionsModalRef = useRef<IMRegionsModalRef>(null);

  const { status } = useContext(UserSectionContext);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "area_ids",
    keyName: "__id",
  });

  const area_ids = useWatch({ control, name: "area_ids" });
  //#endregion

  //#region Event
  const openAddAreasModal = () => regionsModalRef.current?.open();

  const onRemove = (index: number) => () => remove(index);

  const onAddAreas = (addedAreas: IArea[]) => {
    const result: IAreaInUserDataPayload[] = addedAreas.map((e) => ({
      code: e.code,
      name: e.name,
      area_id: e?.id,
    }));
    append(result);
  }; //#endregion

  //#region Render
  const headers: TCTableHeaders<IAreaInUserDataPayload> = [
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
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="white"
          size="small"
          onClick={openAddAreasModal}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      ),
      cellRender: (value, record, index) => (
        <IconButton
          disabled={status !== CONTROL_STATUS.EDITING}
          color="error"
          size="small"
          onClick={onRemove(index)}
        >
          <Close />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <CTable
        showIndexCol={false}
        headerTransform="capitalize"
        height={450}
        headers={headers}
        data={fields}
        dense
        rowKey="__id"
      />
      <MRegionsModal
        ref={regionsModalRef}
        existingAreas={area_ids}
        onAddAreas={onAddAreas}
      />
    </>
  );
  //#endregion
};
