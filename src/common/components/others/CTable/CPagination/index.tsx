import { ReactNode, useCallback, useState } from "react";

import { PAGE_SIZE } from "@constants/options";
import { ALLOWED_NUMBER_KEYS } from "@constants/variables";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  debounce,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

import { IPagination } from "./types";

export const CPagination = ({
  total = 0,
  pages = 0,
  page = 1,
  onPageChange,
  limit = 10,
  onLimitChange,
  showPageSize = true,
  showGoTo = true,
  showTotal = true,
}: IPagination) => {
  //#region Data
  const [currentPage, setCurrentPage] = useState(page ?? 1);
  //#endregion

  //#region Event
  const onPaginationPageChange = (
    event: React.ChangeEvent<unknown>,
    newPageValue: number
  ) => {
    onPageChange(newPageValue);
  };

  const onPaginationLimitChange = (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => {
    onLimitChange?.(event.target.value as number);
  };

  const onPaginationInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const _value = Number(event.target.value);

    if (_value > pages) {
      setCurrentPage(pages);
      debouncePageChange(pages);
      return;
    } else if (isNaN(_value) || _value < 1) {
      setCurrentPage(1);
      debouncePageChange(1);
      return;
    }
    setCurrentPage(_value);
    debouncePageChange(_value);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!ALLOWED_NUMBER_KEYS.includes(event.key)) {
      event.preventDefault();
    }
  };

  const debouncePageChange = useCallback(
    debounce((newPage: number) => onPageChange(newPage), 400),
    []
  );

  const onFocus = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    event.target.select();
  };
  //#endregion

  //#region Render
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      className="c-pagination"
      gap={1}
    >
      {showTotal && (
        <label className="pagination-label">Tổng {total ?? 0} kết quả</label>
      )}
      <Pagination
        count={pages || 1}
        page={page}
        onChange={onPaginationPageChange}
        shape="rounded"
      />

      {showPageSize && (
        <Select
          id="pagination-page-size"
          value={limit}
          onChange={onPaginationLimitChange}
          IconComponent={(iconProps) =>
            iconProps?.className?.includes("MuiSelect-iconOpen") ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )
          }
        >
          {PAGE_SIZE.map((e, i) => (
            <MenuItem
              key={e.value}
              value={e.value}
              className="pagination-select-item"
            >
              {e.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {showGoTo && (
        <>
          {/* <label className="pagination-label">Đi đến trang</label> */}

          <OutlinedInput
            id="pagination-go-to"
            disabled={pages <= 1}
            value={currentPage}
            onKeyDown={onKeyDown}
            onChange={onPaginationInputChange}
            onFocus={onFocus}
          />
        </>
      )}
    </Stack>
  );
  //#endregion
};
