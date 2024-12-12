import { Typography } from "@mui/material";

export const CTitle = ({
  title,
  hasSelection = false,
}: {
  title: string;
  hasSelection?: boolean;
}) => {
  return (
    <Typography
      px={4}
      py={1.5}
      mb={hasSelection ? 0 : -2}
      width="fit-content"
      fontWeight={500}
      color="white"
      zIndex={6}
      bgcolor={(theme) => theme.palette.primary.main}
      sx={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
    >
      {title}
    </Typography>
  );
};
