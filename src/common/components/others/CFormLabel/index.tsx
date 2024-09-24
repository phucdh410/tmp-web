import { useEffect } from "react";

import { FormLabel } from "@mui/material";
import classNames from "classnames";

import { ICFormLabelProps } from "./types";

export const CFormLabel = ({
  className,
  sx,
  children,
  htmlFor,
  ...props
}: ICFormLabelProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const labels = document.getElementsByClassName(
        "MuiFormLabel-root c-form-label"
      );

      Array.from(labels).forEach((label) => {
        const spans = label.getElementsByTagName("span");

        Array.from(spans).forEach((span) => {
          span.innerText = "(*)";
        });
      });
    }
  }, []);

  return (
    <FormLabel
      className={classNames("c-form-label", className)}
      htmlFor={htmlFor}
      sx={{ flexShrink: 0, ...sx }}
      {...props}
    >
      {children}
    </FormLabel>
  );
};
