import { useContext } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IReportInAssignPermissionPayload } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@modules/permission/types";
import { Checkbox } from "@mui/material";
import { CTable } from "@others";

import { UserGroupSectionContext } from "../..";

import { IMReportsTableProps } from "./types";

export const MReportsTable = ({ control, setValue }: IMReportsTableProps) => {
  //#region Data
  const { status } = useContext(UserGroupSectionContext);

  const { fields } = useFieldArray({
    control,
    name: "reports",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onViewChange =
    (index: number, onChangeCallback: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChangeCallback(checked);
      if (!checked) {
        ["export", "delete"].forEach((e) => {
          setValue(
            `reports.${index}.${e as keyof IReportInAssignPermissionPayload}`,
            false
          );
        });
      }
    };

  const onOtherPermissionChange =
    (index: number, onChangeCallback: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChangeCallback(checked);
      if (checked) setValue(`reports.${index}.view`, true);
    };

  const onSelectAll = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: IReportInAssignPermissionPayload,
    index: number
  ) => {
    if (status !== CONTROL_STATUS.EDITING) return;
    ["view", "export", "delete"].forEach((e) => {
      setValue(
        `reports.${index}.${e as keyof IReportInAssignPermissionPayload}`,
        true
      );
    });
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IReportInAssignPermissionPayload> = [
    { key: "permission_name", label: "chức năng", align: "left" },
    {
      key: "view",
      label: "xem",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`reports.${index}.view`}
          render={({ field }) => (
            <Checkbox
              disabled={status !== CONTROL_STATUS.EDITING}
              checked={field.value}
              {...field}
              onChange={onViewChange(index, field.onChange)}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        />
      ),
    },
    {
      key: "export",
      label: "export",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`reports.${index}.export`}
          render={({ field }) => (
            <Checkbox
              disabled={status !== CONTROL_STATUS.EDITING}
              checked={field.value}
              {...field}
              onChange={onOtherPermissionChange(index, field.onChange)}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        />
      ),
    },
    {
      key: "delete",
      label: "xóa",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`reports.${index}.delete`}
          render={({ field }) => (
            <Checkbox
              disabled={status !== CONTROL_STATUS.EDITING}
              checked={field.value}
              {...field}
              onChange={onOtherPermissionChange(index, field.onChange)}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        />
      ),
    },
  ];
  return (
    <CTable
      showIndexCol={false}
      headerTransform="capitalize"
      headers={headers}
      data={fields}
      onRowClick={onSelectAll}
      rowKey="__id"
      dense
    />
  );
  //#endregion
};
