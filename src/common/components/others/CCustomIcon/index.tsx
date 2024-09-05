import ExportExcelIcon from "@assets/icons/excel-1.svg?react";
import ImportExcelIcon from "@assets/icons/excel-2.svg?react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CImportExcelIcon = ({
  inheritViewBox = true,
  ...props
}: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      component={ImportExcelIcon}
      inheritViewBox={inheritViewBox}
    />
  );
};

export const CExportExcelIcon = ({
  inheritViewBox = true,
  ...props
}: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      component={ExportExcelIcon}
      inheritViewBox={inheritViewBox}
    />
  );
};
