import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TableVirtuoso } from "react-virtuoso";

import {
  Checkbox,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";

import { CPagination } from "./CPagination";
import { CRowEmpty } from "./CRowEmpty";
import { CSortIconWrapper } from "./CSortIconWrapper";
import { transformHeaders } from "./funcs";
import { tableComponents } from "./tableComponents";
import { ICTableHeader, ICTableProps } from "./types";

export const CTable = <T extends object>({
  headers = [],
  data = [],
  rowKey = "id",
  loading = false,
  showIndexCol = true,
  headerMultiline = false,
  headerTransform = "none",
  fontSizeBody = 14,
  pagination,
  selection,
  virtual = false,
  sx,
  title,
  autoPaginate = false,
  dense,
  height,
}: ICTableProps<T>) => {
  //#region Data
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const transformedHeaders = useMemo(
    () => transformHeaders(headers),
    [headers]
  );

  //note: use for autoPaginate
  const [autoPagination, setAutoPagination] = useState({ page: 1, limit: 10 });

  //note: use for autoPaginate
  const autoPages = useMemo(
    () => Math.ceil(data.length / autoPagination.limit),
    [data, autoPagination]
  );
  //#endregion

  //#region Event
  //note: use for autoPaginate
  const autoGetCurrentPageData = () => {
    const startIndex = (autoPagination.page - 1) * autoPagination.limit;
    const endIndex = startIndex + autoPagination.limit;
    return data.slice(startIndex, endIndex);
  };

  //note: use for autoPaginate
  const autoPageChange = (newPage: number) => {
    setAutoPagination((prev) => ({ ...prev, page: newPage }));
  };

  //note: use for autoPaginate
  const autoLimitChange = (limit: number) => {
    setAutoPagination({ page: 1, limit });
  };

  const isThisRowSelected = (row: T) => {
    if (selection?.isSelectedAll) return true;
    else {
      return (
        selection?.selectedList?.some(
          (e) => e[rowKey as keyof T] === row[rowKey as keyof T]
        ) ?? false
      );
    }
  };

  const onAddASelection = (row: T) => {
    selection?.onSelect?.([...(selection!.selectedList ?? []), row]);
  };

  const onRemoveASelection = (row: T) => {
    selection?.onSelect?.(
      selection.selectedList?.filter(
        (e) => e[rowKey as keyof T] !== row[rowKey as keyof T]
      ) ?? []
    );
  };

  const onSelect =
    (row: T) =>
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        onAddASelection(row);
      } else {
        onRemoveASelection(row);
      }
    };

  const onRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T,
    index: number
  ) => {
    if (selection && (selection?.selectByClickingRow ?? false)) {
      if ((selection?.type ?? "checkbox") === "checkbox") {
        if (isThisRowSelected(row)) {
          onRemoveASelection(row);
        } else {
          onAddASelection(row);
        }
      }
    }
  };

  const onSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    selection?.onSelectAll?.(checked);
  };

  const onRadioSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
    const item = data.find((e) => e[rowKey as keyof T]?.toString() === value);
    if (item) {
      selection?.onSelect?.([item]);
    }
  };

  const renderRow = useCallback(
    (column: ICTableHeader<T>, row: T, index: number): React.ReactNode => {
      const value = row?.[(column.dataMapKey ?? column.key) as keyof T];

      if (column?.cellRender) {
        return column.cellRender(value, row, index);
      } else if (typeof value !== "string" || typeof value !== "number") {
        if (column.columnType) {
          switch (column.columnType) {
            case "number":
              return value?.toLocaleString();
            case "date":
              return dayjs(value as string | Date).format("DD/MM/YYYY");
            case "datetime":
              return dayjs(value as string | Date).format(
                "DD/MM/YYYY HH:mm:ss"
              );
            case "option":
              if (column.options[0].color) {
                const foundOption = column.options.find((e) => e.id === value);
                return (
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    whiteSpace="nowrap"
                    color={foundOption?.color}
                  >
                    {foundOption?.label ?? ""}
                  </Typography>
                );
              }
              return column.options.find((e) => e.id === value)?.label ?? "";
            default:
              return value?.toString();
          }
        }
        return value?.toString();
      } else {
        return value as React.ReactNode;
      }
    },
    []
  );

  const renderCell = useCallback(
    (column: ICTableHeader<T>, row: T, index: number): React.ReactNode => {
      if (column.children) {
        return column.children.map((_column) =>
          renderCell(_column, row, index)
        );
      }
      return (
        <TableCell
          align={column.align ?? "center"}
          key={column.key as React.Key}
          // key={column.key + _index}
          className={classNames(
            column.key === "action" && "action-cell",
            column.pin && (column.pin === "left" ? "pin-left" : "pin-right")
          )}
          style={{
            fontSize: fontSizeBody,
            ...column.bodyCellStyle,
          }}
        >
          {renderRow(column, row, index)}
        </TableCell>
      );
    },
    []
  );
  //#endregion

  useEffect(() => {
    if (tableBodyRef.current && loadingOverlayRef.current) {
      const topOfTBody = tableBodyRef.current.offsetTop;
      const widthOfTBody = tableBodyRef.current.clientWidth;
      const currentHeight = tableBodyRef.current.clientHeight;
      //note: Because this table has border-spacing 10px,and margin-top -10px
      //note: So we must minus 10px, and height -10px same to match with position
      loadingOverlayRef.current.style.top = `${topOfTBody - 10}px`;
      loadingOverlayRef.current.style.height = `${currentHeight}px`;
      loadingOverlayRef.current.style.width = `${widthOfTBody}px`;
    }
  }, [data]);

  useEffect(() => {
    //!: SÁT TRÁI HIỆN SHADOW PHẢI / SÁT PHẢI HIỆN SHADOW TRÁI
    const handleTableScroll = () => {
      if (!tableWrapperRef.current || !tableRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = tableWrapperRef.current;

      if (scrollLeft === 0) {
        tableRef.current.classList.add("scrolled-pin-right");
        tableRef.current.classList.remove("scrolled-pin-left");
      } else if (scrollLeft + clientWidth === scrollWidth) {
        tableRef.current.classList.add("scrolled-pin-left");
        tableRef.current.classList.remove("scrolled-pin-right");
      } else {
        tableRef.current.classList.add("scrolled-pin-left");
        tableRef.current.classList.add("scrolled-pin-right");
      }
    };

    //note: Xử lý thêm class cho các cột có pin
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll("tr");

      //note: Thêm class pin-left/right vào các cell
      rows.forEach((row) => {
        const cells: NodeListOf<HTMLTableCellElement> =
          row.querySelectorAll("td, th");
        let leftPosition = 0;
        let rightPosition = 0;
        cells.forEach((cell) => {
          if (cell.classList.contains("pin-left")) {
            const cellWidth = cell.offsetWidth;
            cell.style.left = `${leftPosition}px`;
            leftPosition += cellWidth;
          }
          if (cell.classList.contains("pin-right")) {
            const cellWidth = cell.offsetWidth;
            cell.style.right = `${rightPosition}px`;
            rightPosition += cellWidth;
          }
        });
      });

      //note: Đánh dấu cột cuối cùng có pin-left/right
      rows.forEach((row) => {
        const pinLeftCells = row.querySelectorAll("td.pin-left, th.pin-left");
        const pinRightCells = row.querySelectorAll(
          "td.pin-right, th.pin-right"
        );
        if (pinLeftCells.length > 0) {
          const lastPinLeftCell = pinLeftCells[
            pinLeftCells.length - 1
          ] as HTMLElement;
          lastPinLeftCell.classList.add("pin-left--last");
        }
        if (pinRightCells.length > 0) {
          const lastPinRightCell = pinRightCells[
            pinRightCells.length - 1
          ] as HTMLElement;
          lastPinRightCell.classList.add("pin-right--last");
        }
      });
    }

    //note: Xử lý table scroll để hiện thị box-shadow
    if (tableWrapperRef.current) {
      const { scrollWidth, clientWidth } = tableWrapperRef.current;
      //note: Do nếu có scroll X thì mặc định ban đầu sẽ luôn nằm sát trái
      if (scrollWidth > clientWidth && tableRef.current) {
        tableRef.current.classList.add("scrolled-pin-right");
      }
      tableWrapperRef.current.addEventListener("scroll", handleTableScroll);
    }

    return () => {
      if (tableWrapperRef.current) {
        tableWrapperRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
      }
    };
  }, [headers, data]);

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {selection && !(selection?.hideSelectCol ?? false) && (
          <TableCell
            width={60}
            align="center"
            className={classNames(
              "select-cell",
              (selection?.pin ?? true) && "pin-left"
            )}
          >
            {(selection?.type ?? "checkbox") === "checkbox" &&
              !(selection?.hideCheckAll ?? false) && (
                <Checkbox
                  indeterminate={selection?.isIndeterminate}
                  checked={selection?.isSelectedAll}
                  disabled={!data.length}
                  onChange={onSelectAll}
                />
              )}
          </TableCell>
        )}
        {showIndexCol && <TableCell align="center">STT</TableCell>}
        {headers.map((headerCell, index) => (
          <TableCell
            key={
              rowKey
                ? (headerCell.key as React.Key)
                : index + new Date().toString()
            }
            rowSpan={headerCell.rowSpan ?? 1}
            colSpan={headerCell.colSpan ?? 1}
            align={headerCell.align ?? "center"}
            width={headerCell.width ?? "auto"}
            onClick={headerCell.sorter ? headerCell.toggleSort : undefined}
            className={classNames(
              headerCell.pin &&
                (headerCell.pin === "left" ? "pin-left" : "pin-right")
            )}
            style={{
              whiteSpace: headerMultiline ? "pre" : "nowrap",
              textTransform: headerTransform ?? "none",
              minWidth: headerCell.width ?? "unset",
              width: headerCell.width ?? "auto",
              userSelect: headerCell.sorter ? "none" : undefined,
              cursor: headerCell.sorter ? "pointer" : "default",
              ...headerCell.style,
            }}
          >
            {headerCell?.render ? headerCell.render() : headerCell.label}
            {headerCell.sorter && (
              <CSortIconWrapper sorter={headerCell.sorter} />
            )}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const itemContent = (_index: number, row: T) => {
    return (
      <>
        {selection && !(selection?.hideSelectCol ?? false) && (
          <TableCell
            align="center"
            className={classNames(
              "select-cell",
              (selection?.pin ?? true) && "pin-left"
            )}
          >
            {(selection?.type ?? "checkbox") === "checkbox" ? (
              <Checkbox
                checked={isThisRowSelected(row)}
                onChange={onSelect(row)}
              />
            ) : (
              <Radio value={row[rowKey as keyof T]} />
            )}
          </TableCell>
        )}
        {showIndexCol && (
          <TableCell align="center">
            {pagination ? _index + 1 + (pagination.page - 1) * 10 : _index + 1}
          </TableCell>
        )}
        {headers.map((column, __index) => renderCell(column, row, _index))}
      </>
    );
  };

  const RadioWrapper = ({
    isSelectionTypeRadio,
    children,
  }: {
    isSelectionTypeRadio: boolean;
    children: React.ReactNode;
  }) => {
    return isSelectionTypeRadio ? (
      <RadioGroup
        value={selection?.selectedList?.[0]?.[rowKey as keyof T] ?? null}
        onChange={onRadioSelectChange}
      >
        {children}
      </RadioGroup>
    ) : (
      children
    );
  };

  //#region Render
  return (
    <Stack direction="column" gap={2} justifyContent="space-between" sx={sx}>
      {title && (
        <Typography
          px={4}
          py={1.5}
          mb={-2}
          width="fit-content"
          fontWeight={500}
          color="white"
          zIndex={6}
          bgcolor={(theme) => theme.palette.primary.main}
          sx={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        >
          {title}
        </Typography>
      )}
      {/* //note:tính năng virtual vẫn chưa hoàn thiện */}
      <RadioWrapper
        isSelectionTypeRadio={(selection?.type ?? "checkbox") === "radio"}
      >
        {virtual ? (
          <TableVirtuoso
            data={data}
            components={tableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
          />
        ) : (
          <TableContainer
            ref={tableWrapperRef}
            sx={{
              height,
              boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
          >
            <Table
              ref={tableRef}
              stickyHeader
              className={classNames("c-table", dense && "dense")}
            >
              <TableHead className="c-table-head">
                {transformedHeaders.map((header, i) => (
                  <TableRow key={new Date().toString() + i}>
                    {selection && !(selection?.hideSelectCol ?? false) && (
                      <TableCell
                        width={60}
                        align="center"
                        className={classNames(
                          "select-cell",
                          (selection?.pin ?? true) && "pin-left"
                        )}
                      >
                        {(selection?.type ?? "checkbox") === "checkbox" &&
                          !(selection?.hideCheckAll ?? false) && (
                            <Checkbox
                              indeterminate={
                                selection?.isIndeterminate ?? false
                              }
                              checked={selection?.isSelectedAll ?? false}
                              disabled={!data.length}
                              onChange={onSelectAll}
                            />
                          )}
                      </TableCell>
                    )}
                    {showIndexCol && <TableCell align="center">STT</TableCell>}
                    {header.map((headerCell, index) => (
                      <TableCell
                        key={
                          rowKey
                            ? (headerCell.key as React.Key)
                            : index + new Date().toString()
                        }
                        rowSpan={headerCell.rowSpan ?? 1}
                        colSpan={headerCell.colSpan ?? 1}
                        align={headerCell.align ?? "center"}
                        width={headerCell.width ?? "auto"}
                        onClick={
                          headerCell.sorter ? headerCell.toggleSort : undefined
                        }
                        className={classNames(
                          headerCell.pin &&
                            (headerCell.pin === "left"
                              ? "pin-left"
                              : "pin-right")
                        )}
                        style={{
                          whiteSpace: headerMultiline ? "pre" : "nowrap",
                          textTransform: headerTransform ?? "none",
                          minWidth: headerCell.width ?? "unset",
                          width: headerCell.width ?? "auto",
                          userSelect: headerCell.sorter ? "none" : undefined,
                          cursor: headerCell.sorter ? "pointer" : "default",
                          ...headerCell.style,
                        }}
                      >
                        {headerCell?.render
                          ? headerCell.render()
                          : headerCell.label}
                        {headerCell.sorter && (
                          <CSortIconWrapper sorter={headerCell.sorter} />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody className="c-table-body" ref={tableBodyRef}>
                {data?.length > 0 ? (
                  (autoPaginate ? autoGetCurrentPageData() : data).map(
                    (row, index) => (
                      <TableRow
                        key={
                          rowKey
                            ? (row?.[rowKey as keyof T] as React.Key)
                            : index + new Date().toString()
                        }
                        onClick={(event) => onRowClick(event, row, index)}
                        style={{
                          cursor: selection?.selectByClickingRow
                            ? "pointer"
                            : "auto",
                        }}
                        selected={isThisRowSelected(row)}
                      >
                        {selection && !(selection?.hideSelectCol ?? false) && (
                          <TableCell
                            align="center"
                            className={classNames(
                              "select-cell",
                              (selection?.pin ?? true) && "pin-left"
                            )}
                          >
                            {(selection?.type ?? "checkbox") === "checkbox" ? (
                              <Checkbox
                                checked={isThisRowSelected(row)}
                                onChange={onSelect(row)}
                              />
                            ) : (
                              <Radio value={row[rowKey as keyof T]} />
                            )}
                          </TableCell>
                        )}
                        {showIndexCol && (
                          <TableCell align="center">
                            {pagination
                              ? index + 1 + (pagination.page - 1) * 10
                              : index + 1}
                          </TableCell>
                        )}
                        {headers.map((column, _index) =>
                          renderCell(column, row, index)
                        )}
                      </TableRow>
                    )
                  )
                ) : (
                  <CRowEmpty
                    span={
                      headers.length +
                      Number(showIndexCol) +
                      Number(
                        !!selection && !(selection?.hideSelectCol ?? false)
                      )
                    }
                  />
                )}
              </TableBody>
            </Table>
            <Stack
              position="absolute"
              ref={loadingOverlayRef}
              alignItems="center"
              justifyContent="start"
              bgcolor="#00000014"
              display={{ display: loading ? "flex" : "none" }}
              sx={{ inset: 0, zIndex: 6 }}
            >
              <LinearProgress sx={{ width: "100%" }} />
            </Stack>
          </TableContainer>
        )}
      </RadioWrapper>

      {pagination && (
        <CPagination
          total={pagination.total}
          pages={pagination.pages}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          limit={pagination.limit ? Number(pagination.limit) : 10}
          onLimitChange={pagination.onLimitChange}
          showTotal={pagination?.total ? true : pagination.showTotal ?? false}
          showGoTo={pagination.showGoTo ?? false}
          showPageSize={pagination.showPageSize ?? false}
        />
      )}
      {autoPaginate && (
        <CPagination
          total={data.length}
          pages={autoPages}
          page={autoPagination.page}
          onPageChange={autoPageChange}
          limit={autoPagination.limit}
          onLimitChange={autoLimitChange}
          showTotal
          showGoTo={false}
          showPageSize
        />
      )}
    </Stack>
  );
  //#endregion
};
