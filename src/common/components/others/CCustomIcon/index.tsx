import CheckedIcon from "@assets/icons/checked.svg?react";
import ExportExcelIcon from "@assets/icons/excel-1.svg?react";
import ImportExcelIcon from "@assets/icons/excel-2.svg?react";
import IndeterminateIcon from "@assets/icons/indeterminate.svg?react";
import UncheckIcon from "@assets/icons/uncheck.svg?react";
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

export const CUncheckIcon = ({
  inheritViewBox = true,
  ...props
}: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      component={UncheckIcon}
      inheritViewBox={inheritViewBox}
    />
  );
};

export const CCheckedIcon = ({
  inheritViewBox = true,
  ...props
}: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      component={CheckedIcon}
      inheritViewBox={inheritViewBox}
    />
  );
};

export const CIndeterminateIcon = ({
  inheritViewBox = true,
  ...props
}: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      component={IndeterminateIcon}
      inheritViewBox={inheritViewBox}
    />
  );
};
