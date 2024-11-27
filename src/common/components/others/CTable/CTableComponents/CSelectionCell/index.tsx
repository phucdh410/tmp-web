import { Checkbox, Radio, TableCell } from "@mui/material";
import classNames from "classnames";

import { ICSelectionCellProps, IHeaderProps } from "./types";

export const Header = <T extends object>({
  selection,
  disabled,
  onChange,
}: IHeaderProps<T>) => {
  return selection && !(selection?.hideSelectCol ?? false) ? (
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
            indeterminate={selection?.isIndeterminate ?? false}
            checked={selection?.isSelectedAll ?? false}
            disabled={disabled}
            onChange={onChange}
            // disabled={!data.length}
            // onChange={onSelectAll}
          />
        )}
    </TableCell>
  ) : (
    <></>
  );
};

export const CSelectionCell = <T extends object>({
  selection,
  checkboxValue,
  onChange,
  radioValue,
  disabled,
}: ICSelectionCellProps<T> & { Header?: typeof Header }) => {
  return selection && !(selection?.hideSelectCol ?? false) ? (
    <TableCell
      align="center"
      className={classNames(
        "select-cell",
        (selection?.pin ?? true) && "pin-left"
      )}
    >
      {(selection?.type ?? "checkbox") === "checkbox" ? (
        <Checkbox
          checked={checkboxValue}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        // <Checkbox checked={isThisRowSelected(row)} onChange={onSelect(row)} />
        <Radio value={radioValue} />
        // <Radio value={row[rowKey as keyof T]} />
      )}
    </TableCell>
  ) : (
    <></>
  );
};

CSelectionCell.Header = Header;
