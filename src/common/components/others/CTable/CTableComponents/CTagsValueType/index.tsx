import { Typography } from "@mui/material";

import { addAlphaToHexColor } from "../../funcs";

import { ICTagsValueTypeProps } from "./types";

//TODO: add more color or random for many tags
const color = "#389e0d";

/**
 *
 * @param value This is the value show in tag
 * @param get If type of your value is object, you must pass this props to work correct
 * @returns
 */
export const CTagsValueType = ({ value = "", get }: ICTagsValueTypeProps) => {
  return (
    <Typography
      component="span"
      fontSize={12}
      whiteSpace="nowrap"
      px={0.85}
      py={0.5}
      borderRadius="5px"
      border={`solid 1px ${addAlphaToHexColor(color, 0.35)}`}
      bgcolor={addAlphaToHexColor(color, 0.1)}
      color={color}
    >
      {get ? value?.[get] : value}
    </Typography>
  );
};
