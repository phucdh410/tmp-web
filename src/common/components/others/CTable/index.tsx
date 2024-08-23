import React, { useMemo, useState } from "react";

import {
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import classNames from "classnames";

import { CPagination } from "./CPagination";
import { CRowEmpty } from "./CRowEmpty";
import { CRowLoading } from "./CRowLoading";
import { ICTableProps } from "./types";

export const CTable = <T extends object>({
  headers = [],
  data = [],
  rowKey = "id" as keyof T,
  loading = false,
  showIndexCol = true,
  headerMultiline = false,
  headerTransform = "none",
  fontSizeBody = 14,
  pagination,
  onRowClick,
  selectable = false,
}: ICTableProps<T>) => {
  //#region Data
  const [selected, setSelected] = useState<T[]>([]);

  const isSelectedAll = useMemo(
    () => !!(data.length && data.length === selected.length),
    [selected, data]
  );
  const isIndeterminate = useMemo(
    () => !!(data.length && selected.length && selected.length < data.length),
    [selected, data]
  );
  //#endregion

  //#region Event
  const checkRowSelected = (row: T) => {
    return selected.some((e) => e[rowKey] === row[rowKey]);
  };

  const onSelect =
    (row: T | -1) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        if (row !== -1) {
          setSelected((prev) => [...prev, row]);
        } else {
          setSelected([...data]);
        }
      } else {
        if (row !== -1) {
          const result = selected.filter((e) => e[rowKey] !== row[rowKey]);
          setSelected(result);
        } else {
          setSelected([]);
        }
      }
    };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" gap={2} justifyContent="space-between">
      <TableContainer sx={{ boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.15)" }}>
        <Table stickyHeader className="c-table">
          <TableHead className="c-table-head">
            <TableRow>
              {selectable && (
                <TableCell width={60} align="center" className="select-cell">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isSelectedAll}
                    onChange={onSelect(-1)}
                  />
                </TableCell>
              )}
              {showIndexCol && <TableCell align="center">STT</TableCell>}
              {headers.map((header, index) => (
                <TableCell
                  key={header.key as React.Key}
                  // key={header.key + index}
                  colSpan={header.colSpan ?? 1}
                  align={header.align ?? "center"}
                  width={header.width ?? "auto"}
                  style={{
                    whiteSpace: headerMultiline ? "pre-wrap" : "nowrap",
                    textTransform: headerTransform ?? "none",
                    minWidth: header.width ?? "unset",
                    width: header.width ?? "auto",
                    ...(header?.pin && {
                      position: "sticky",
                      ...(header.pin === "right"
                        ? {
                            right: 0,
                          }
                        : {
                            left: 0,
                          }),
                    }),
                    ...header.style,
                  }}
                >
                  {header?.render ? header.render() : header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="c-table-body">
            {loading ? (
              <CRowLoading span={headers.length + Number(showIndexCol)} />
            ) : data?.length > 0 ? (
              data.map((row, index) => (
                <TableRow
                  key={row?.[rowKey as keyof T] as React.Key}
                  // key={row[rowKey] + index}
                  onClick={
                    onRowClick
                      ? (event) => onRowClick(event, row, index)
                      : undefined
                  }
                  style={{ cursor: onRowClick ? "pointer" : "auto" }}
                  selected={checkRowSelected(row)}
                >
                  {selectable && (
                    <TableCell align="center" className="select-cell">
                      <Checkbox
                        checked={checkRowSelected(row)}
                        onChange={onSelect(row)}
                      />
                    </TableCell>
                  )}
                  {showIndexCol && (
                    <TableCell align="center">
                      {pagination
                        ? index + 1 + (pagination.page - 1) * 10
                        : index + 1}
                    </TableCell>
                  )}
                  {headers.map((column, _index) => (
                    <TableCell
                      align={column.align ?? "center"}
                      key={column.key as React.Key}
                      // key={column.key + _index}
                      className={classNames(
                        column.key === "check" ||
                          column.key === "select" ||
                          (column.key === "action" && "action-cell")
                      )}
                      style={{
                        fontSize: fontSizeBody,
                        ...(column?.pin && {
                          position: "sticky",
                          background: "inherit",
                          ...(column.pin === "right"
                            ? {
                                right: 0,
                                boxShadow: "rgb(0 0 0 / 8%) -6px 0px 5px -1px",
                                overflow: "hidden",
                              }
                            : {
                                left: 0,
                              }),
                        }),
                      }}
                    >
                      {column?.cellRender
                        ? column.cellRender(row?.[column.key], row, index)
                        : typeof row?.[column.key] !== "string" ||
                          typeof row?.[column.key] !== "number"
                        ? row?.[column.key]?.toString()
                        : (row?.[column.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <CRowEmpty span={headers.length + Number(showIndexCol)} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <CPagination
          total={pagination.total}
          pages={pagination.pages}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          limit={pagination.limit ? Number(pagination.limit) : 10}
          onLimitChange={pagination.onLimitChange}
          showTotal={pagination.showTotal ?? false}
          showGoTo={pagination.showGoTo ?? false}
          showPageSize={pagination.showPageSize ?? false}
        />
      )}
    </Stack>
  );
  //#endregion
};
