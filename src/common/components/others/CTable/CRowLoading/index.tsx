import { CircularProgress, TableCell, TableRow } from "@mui/material";

export const CRowLoading = ({ span }: { span: number }) => {
  return (
    <TableRow className="c-row-loading">
      <TableCell colSpan={span}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};
