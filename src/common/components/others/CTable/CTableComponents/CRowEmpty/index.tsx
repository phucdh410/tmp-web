import empty from "@assets/images/empty.png";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";

export const CRowEmpty = ({ span }: { span: number }) => {
  return (
    <TableRow className="c-row-empty">
      <TableCell colSpan={span}>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          height={250}
          sx={{ userSelect: "none" }}
        >
          <img
            loading="lazy"
            src={empty}
            style={{ maxWidth: 120, opacity: 0.7 }}
          />
          <Typography
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
            pb={5}
          >
            Dữ liệu trống
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
