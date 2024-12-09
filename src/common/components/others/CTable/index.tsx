import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TableVirtuoso } from "react-virtuoso";

import {
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

import {
  CHeaderCell,
  CLoadingOverlay,
  CPagination,
  CRadioWrapper,
  CRowEmpty,
  CSelectionCell,
  CTagsValueType,
  CTitle,
  CVirtualComponents,
} from "./CTableComponents";
import { generateKeyJSX, transformHeaders } from "./funcs";
import { ICTableHeader, ICTableProps } from "./types";

export const CTable = <T extends object, F extends object>({
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
  headersWithSpanData,
  getSpanData,
}: ICTableProps<T, F>) => {
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
      if (
        !selection.getCheckboxDisable ||
        selection.getCheckboxDisable(row) === false
      ) {
        if ((selection?.type ?? "checkbox") === "checkbox") {
          if (isThisRowSelected(row)) {
            onRemoveASelection(row);
          } else {
            onAddASelection(row);
          }
        } else {
          selection?.onSelect?.([row]);
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
    <K extends object>(
      column: ICTableHeader<K>,
      row: K,
      index: number
    ): React.ReactNode => {
      const value = row?.[(column.dataMapKey ?? column.key) as keyof K];

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
            case "tags":
              return Array.isArray(value) ? (
                <Stack direction="row" flexWrap="wrap" gap={0.65}>
                  {value.map((e) => (
                    <CTagsValueType
                      value={e}
                      get={column.displayTag}
                      color={column.tagColor}
                    />
                  ))}
                </Stack>
              ) : (
                <CTagsValueType
                  value={value}
                  get={column.displayTag}
                  color={column.tagColor}
                />
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
    <K extends object>(
      column: ICTableHeader<K>,
      row: K,
      index: number
    ): React.ReactNode => {
      if (column.children) {
        return column.children.map((_column) =>
          renderCell(_column, row, index)
        );
      }
      return (
        <TableCell
          align={column.align ?? "center"}
          key={generateKeyJSX()}
          rowSpan={
            column?.bodyRowSpan?.(
              row?.[(column.dataMapKey ?? column.key) as keyof K],
              row,
              index
            ) ?? 1
          }
          className={classNames(
            column.key === "action" && "action-cell",
            column.pin && (column.pin === "left" ? "pin-left" : "pin-right"),
            column.columnType === "input" && "input-cell"
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

        //note: Xử lý các cột pin trái
        let leftPosition = 0;
        cells.forEach((cell) => {
          if (cell.classList.contains("pin-left")) {
            const cellWidth = cell.offsetWidth;
            cell.style.left = `${leftPosition}px`;
            leftPosition += cellWidth;
          }
        });

        //note: Xử lý các cột pin phải
        let rightPosition = 0;
        const pinRightCells = Array.from(cells).filter((cell) =>
          cell.classList.contains("pin-right")
        );
        for (let i = pinRightCells.length - 1; i >= 0; i--) {
          const cell = pinRightCells[i];
          const cellWidth = cell.offsetWidth;
          cell.style.right = `${rightPosition}px`;
          rightPosition += cellWidth;
        }
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
          const firstPinRightCell = pinRightCells[0] as HTMLElement;
          firstPinRightCell.classList.add("pin-right--first");
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
        <CSelectionCell.Header
          selection={selection}
          disabled={!data.length}
          onChange={onSelectAll}
        />
        {showIndexCol && <TableCell align="center">STT</TableCell>}
        {headers.map((headerCell, index) => (
          <CHeaderCell
            key={generateKeyJSX()}
            header={headerCell}
            headerMultiline={headerMultiline}
            headerTransform={headerTransform}
          />
        ))}
      </TableRow>
    );
  };

  const itemContent = (_index: number, row: T) => {
    return (
      <>
        <CSelectionCell
          selection={selection}
          checkboxValue={isThisRowSelected(row)}
          onChange={onSelect(row)}
          radioValue={row[rowKey as keyof T]}
        />
        {showIndexCol && (
          <TableCell align="center">
            {pagination ? _index + 1 + (pagination.page - 1) * 10 : _index + 1}
          </TableCell>
        )}
        {headers.map((column, _index) => renderCell(column, row, _index))}
      </>
    );
  };

  //#region Render
  return (
    <Stack direction="column" gap={2} justifyContent="space-between" sx={sx}>
      {title && <CTitle title={title} />}

      {/* //note:tính năng virtual vẫn chưa hoàn thiện */}
      <CRadioWrapper
        type={selection?.type ?? "checkbox"}
        value={selection?.selectedList?.[0]?.[rowKey as keyof T]}
        onChange={onRadioSelectChange}
      >
        {virtual ? (
          <TableVirtuoso
            data={data}
            components={CVirtualComponents}
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
                  <TableRow key={generateKeyJSX(i)}>
                    <CSelectionCell.Header
                      selection={selection}
                      disabled={!data.length}
                      onChange={onSelectAll}
                    />
                    {showIndexCol && <TableCell align="center">STT</TableCell>}
                    {header.map((headerCell, index) => (
                      <CHeaderCell
                        key={generateKeyJSX(index)}
                        header={headerCell}
                        headerMultiline={headerMultiline}
                        headerTransform={headerTransform}
                      />
                    ))}
                    {headersWithSpanData &&
                      headersWithSpanData.length > 0 &&
                      headersWithSpanData.map((headerCell, index) => (
                        <CHeaderCell
                          key={generateKeyJSX(index)}
                          header={headerCell}
                          headerMultiline={headerMultiline}
                          headerTransform={headerTransform}
                        />
                      ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody className="c-table-body" ref={tableBodyRef}>
                {data?.length > 0 ? (
                  (autoPaginate ? autoGetCurrentPageData() : data).map(
                    (row, index) => (
                      <React.Fragment
                        key={generateKeyJSX(row[rowKey as keyof T])}
                      >
                        <TableRow
                          onClick={(event) => onRowClick(event, row, index)}
                          style={{
                            cursor: selection?.selectByClickingRow
                              ? "pointer"
                              : "auto",
                          }}
                          className={classNames(
                            headersWithSpanData && "disable-hover-row"
                          )}
                          selected={isThisRowSelected(row)}
                        >
                          <CSelectionCell
                            selection={selection}
                            checkboxValue={isThisRowSelected(row)}
                            onChange={onSelect(row)}
                            radioValue={row[rowKey as keyof T]}
                            disabled={
                              selection?.getCheckboxDisable?.(row) ?? false
                            }
                          />
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
                          {headersWithSpanData &&
                            getSpanData &&
                            headersWithSpanData.map((spanColumn) =>
                              renderCell(
                                spanColumn,
                                getSpanData(row, index)[0],
                                index
                              )
                            )}
                        </TableRow>
                        {headersWithSpanData &&
                          getSpanData &&
                          getSpanData(row, index).length > 1 &&
                          getSpanData(row, index)
                            .slice(1)
                            .map((e, spanColIndex) => (
                              <TableRow
                                key={generateKeyJSX(spanColIndex)}
                                className={classNames(
                                  headersWithSpanData && "disable-hover-row"
                                )}
                                selected={isThisRowSelected(row)}
                              >
                                {headersWithSpanData.map((column, _index) =>
                                  renderCell(column, e, _index)
                                )}
                              </TableRow>
                            ))}
                      </React.Fragment>
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
            <CLoadingOverlay ref={loadingOverlayRef} loading={loading} />
          </TableContainer>
        )}
      </CRadioWrapper>

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
