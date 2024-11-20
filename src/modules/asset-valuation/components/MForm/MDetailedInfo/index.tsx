import { Grid2, Typography } from "@mui/material";

import { IMDetailedInfoProps } from "./types";

export const MDetailedInfo = ({ control, index }: IMDetailedInfoProps) => {
  return (
    <>
      <Typography
        mb={2}
        fontSize="1.5rem"
        fontWeight={500}
        textTransform="uppercase"
      >
        thông tin chi tiết tài sản
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={1}></Grid2>
      </Grid2>
    </>
  );
};
