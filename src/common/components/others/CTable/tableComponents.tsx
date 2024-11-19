import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from "@mui/material";
import classNames from "classnames";

//note: This use for virtual feature
export const tableComponents = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <Paper sx={{ height: 400, width: "100%", boxShadow: "none" }}>
      <TableContainer
        {...props}
        ref={ref}
        sx={{
          height: 400,
          boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.15)",
          position: "relative",
        }}
      />
    </Paper>
  )),
  Table: (props: TableProps) => (
    <Table {...props} stickyHeader className={classNames("c-table dense")} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} className="c-table-head" />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} className="c-table-body" ref={ref} />
  )),
};
