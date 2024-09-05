import { CExportExcelIcon, CImportExcelIcon } from "@others";
import classNames from "classnames";

import { CButton } from "../CButton";

import { ICExcelButtonProps } from "./types";

import "./styles.scss";

export const CExcelButton = ({
  purpose,
  children,
  className,
  ...props
}: ICExcelButtonProps) => {
  return (
    <CButton
      className={classNames("c-excel-button", className)}
      variant="outlined"
      startIcon={
        purpose === "import" ? (
          <CImportExcelIcon sx={{ fontSize: "28px!important" }} />
        ) : (
          <CExportExcelIcon sx={{ fontSize: "28px!important" }} />
        )
      }
      {...props}
    >
      {children ? children : purpose === "import" ? "Import" : "Export"}
    </CButton>
  );
};
