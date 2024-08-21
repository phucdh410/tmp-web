import { useRef } from "react";

import { PAGE_SIZE } from "@constants/options";
import { NUMBER_STRING } from "@constants/variables";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  FilledInput,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";

import { IPagination } from "./types";

export const CPagination = ({
  total,
  pages,
  page,
  onPageChange,
  limit,
  onLimitChange,
  getDataByPageInput,
  showPageSize,
  showGoTo,
  showTotal = true,
}: IPagination) => {
  const inputRef = useRef(null);

  const handleKeyDown = async (e) => {
    if (
      !e.key.match(NUMBER_STRING) &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    )
      e.preventDefault();

    let _page = 1;

    if (e.key === "Enter") {
      const currentPage = e.target.value;

      if (parseInt(currentPage) > pages) {
        _page = pages;
      } else if (currentPage === "" || parseInt(currentPage) <= 0) {
        _page = 1;
      } else {
        _page = currentPage;
      }

      await getDataByPageInput(Number(_page));

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.blur();
      }
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      className="c-pagination"
    >
      {showTotal && (
        <label className="pagination-label">Tổng {total ?? 0} kết quả</label>
      )}
      <Pagination
        count={pages || 1}
        page={page}
        onChange={onPageChange}
        shape="rounded"
      />

      {showPageSize && (
        <Select
          className="pagination-select"
          size="small"
          variant="filled"
          value={limit}
          onChange={onLimitChange}
          IconComponent={(iconProps) =>
            iconProps?.className?.includes("MuiSelect-iconOpen") ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowDown />
            )
          }
        >
          {PAGE_SIZE.map((e, i) => (
            <MenuItem key={i} value={e.id} className="pagination-select-item">
              {e.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {showGoTo && (
        <>
          <label className="pagination-label">Đi đến trang</label>

          <FilledInput
            inputRef={inputRef}
            disabled={pages <= 1}
            className="pagination-input"
            size="small"
            placeholder="1, 2, 3,..."
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </Stack>
  );
};
