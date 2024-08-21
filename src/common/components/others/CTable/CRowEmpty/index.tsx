import { TableCell, TableRow, Typography } from "@mui/material";

export const CRowEmpty = ({ span }: { span: number }) => {
  return (
    <TableRow className="c-row-empty">
      <TableCell colSpan={span}>
        <Typography
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
          minHeight={200}
        >
          Dữ liệu trống
        </Typography>
      </TableCell>
    </TableRow>
  );
};
