import {
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

export const CTable = ({
  headers = [],
  data = [],
  rowKey = "id",
  loading = false,
  showIndexCol = true,
  headerMultiline = false,
  headerTransform = "none",
  fontSizeBody = 14,
  pagination,
  onRowClick,
  isRowSelected,
}: ICTableProps) => {
  return (
    <Stack direction="column" gap={2} justifyContent="space-between">
      <TableContainer sx={{ boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.15)" }}>
        <Table stickyHeader className="c-table">
          <TableHead className="c-table-head">
            <TableRow>
              {showIndexCol && <TableCell align="center">STT</TableCell>}
              {headers.map((header, index) => (
                <TableCell
                  key={header.key + index}
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
                  key={row[rowKey] + index}
                  onClick={
                    onRowClick
                      ? (event) => onRowClick(event, row, index)
                      : undefined
                  }
                  style={{ cursor: onRowClick ? "pointer" : "auto" }}
                  selected={
                    row?.selected ?? isRowSelected
                      ? isRowSelected(row)
                      : row?.selected
                  }
                >
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
                      key={column.key + _index}
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
                        : row?.[column.key]}
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
          getDataByPageInput={pagination.getDataByPageInput}
          showTotal={pagination.showTotal}
          showGoTo={pagination.showGoTo}
          showPageSize={pagination.showPageSize}
        />
      )}
    </Stack>
  );
};
