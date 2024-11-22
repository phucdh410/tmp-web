import { TableCell } from "@mui/material";
import classNames from "classnames";

import { CSortIconWrapper } from "./CSortIconWrapper";
import { ICHeaderCellProps } from "./types";

export const CHeaderCell = <T extends object>({
  header,
  headerMultiline,
  headerTransform,
}: ICHeaderCellProps<T>) => {
  return (
    <TableCell
      // key={
      //   rowKey ? (headerCell.key as React.Key) : index + new Date().toString()
      // }
      rowSpan={header.rowSpan ?? 1}
      colSpan={header.colSpan ?? 1}
      align={header.align ?? "center"}
      width={header.width ?? "auto"}
      onClick={header.sorter ? header.toggleSort : undefined}
      className={classNames(
        header.pin && (header.pin === "left" ? "pin-left" : "pin-right")
      )}
      style={{
        whiteSpace: headerMultiline ? "pre" : "nowrap",
        textTransform: headerTransform ?? "none",
        minWidth: header.width ?? "unset",
        width: header.width ?? "auto",
        userSelect: header.sorter ? "none" : undefined,
        cursor: header.sorter ? "pointer" : "default",
        ...header.style,
      }}
    >
      {header?.render ? header.render() : header.label}
      {header.sorter && <CSortIconWrapper sorter={header.sorter} />}
    </TableCell>
  );
};
