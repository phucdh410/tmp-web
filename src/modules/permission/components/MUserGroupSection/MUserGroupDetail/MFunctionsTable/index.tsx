import { useContext } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { TCTableHeaders } from "@components/others/CTable/types";
import { IFeatureInAssignPermissionPayload } from "@interfaces/permissions";
import { CONTROL_STATUS } from "@interfaces/permissions";
import { Checkbox } from "@mui/material";
import { CTable } from "@others";

import { UserGroupSectionContext } from "../..";

import { IMFunctionsTableProps } from "./types";

export const MFunctionsTable = ({
  control,
  setValue,
}: IMFunctionsTableProps) => {
  //#region Data
  const { status } = useContext(UserGroupSectionContext);

  const { fields } = useFieldArray({
    control,
    name: "features",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onViewChange =
    (index: number, onChangeCallback: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChangeCallback(checked);
      if (!checked) {
        ["export", "print", "add", "update", "delete", "confirm"].forEach(
          (e) => {
            setValue(
              `features.${index}.${
                e as keyof IFeatureInAssignPermissionPayload
              }`,
              false
            );
          }
        );
      }
    };

  const onOtherPermissionChange =
    (index: number, onChangeCallback: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChangeCallback(checked);
      if (checked) setValue(`features.${index}.view`, true);
    };

  const onSelectAll = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: IFeatureInAssignPermissionPayload,
    index: number
  ) => {
    if (status !== CONTROL_STATUS.EDITING) return;
    ["view", "export", "print", "add", "update", "delete", "confirm"].forEach(
      (e) => {
        setValue(
          `features.${index}.${e as keyof IFeatureInAssignPermissionPayload}`,
          true
        );
      }
    );
  };
  //#endregion

  //#region Render
  const headers: TCTableHeaders<IFeatureInAssignPermissionPayload> = [
    { key: "permission_name", label: "chức năng", align: "left" },
    {
      key: "view",
      label: "xem",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`features.${index}.view`}
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
          name={`features.${index}.export`}
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
      key: "print",
      label: "in",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`features.${index}.print`}
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
      key: "add",
      label: "thêm",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`features.${index}.add`}
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
      key: "update",
      label: "sửa",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`features.${index}.update`}
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
          name={`features.${index}.delete`}
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
      key: "confirm",
      label: "xác nhận",
      bodyCellStyle: { padding: 0 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`features.${index}.confirm`}
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
