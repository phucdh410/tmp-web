import { FC } from "react";

import {
  Add as AddIcon,
  Block,
  Build,
  DeleteForever,
  FilterAlt,
  Print as PrintIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { ButtonProps } from "@mui/material";

import { CButton } from "../CButton";
import { CExcelButton } from "../CExcelButton";

type CToolbarButtonsType = FC & {
  Add: FC<ButtonProps>;
  Edit: FC<ButtonProps>;
  Delete: FC<ButtonProps>;
  Save: FC<ButtonProps>;
  Cancel: FC<ButtonProps>;
  Import: FC<ButtonProps>;
  Export: FC<ButtonProps>;
  Print: FC<ButtonProps>;
  Filter: FC<ButtonProps>;
};

export const CToolbarButtons: CToolbarButtonsType = () => {
  return <div>Toolbar buttons collection</div>;
};

const Add: React.FC<ButtonProps> = (props) => {
  return (
    <CButton
      variant="outlined"
      size="small"
      startIcon={<AddIcon />}
      {...props}
    />
  );
};
const Edit: React.FC<ButtonProps> = (props) => {
  return (
    <CButton variant="outlined" size="small" startIcon={<Build />} {...props} />
  );
};
const Delete: React.FC<ButtonProps> = (props) => {
  return (
    <CButton
      variant="outlined"
      size="small"
      startIcon={<DeleteForever />}
      {...props}
    />
  );
};
const Save: React.FC<ButtonProps> = (props) => {
  return (
    <CButton
      variant="outlined"
      size="small"
      startIcon={<SaveIcon />}
      {...props}
    />
  );
};
const Cancel: React.FC<ButtonProps> = (props) => {
  return (
    <CButton variant="outlined" size="small" startIcon={<Block />} {...props} />
  );
};
const Import: React.FC<ButtonProps> = (props) => {
  return <CExcelButton purpose="import" size="small" {...props} />;
};
const Export: React.FC<ButtonProps> = (props) => {
  return <CExcelButton purpose="export" size="small" {...props} />;
};
const Print: React.FC<ButtonProps> = (props) => {
  return (
    <CButton
      variant="outlined"
      size="small"
      startIcon={<PrintIcon />}
      {...props}
    />
  );
};
const Filter: React.FC<ButtonProps> = (props) => {
  return (
    <CButton
      variant="outlined"
      size="small"
      startIcon={<FilterAlt />}
      {...props}
    />
  );
};

CToolbarButtons.Add = Add;
CToolbarButtons.Edit = Edit;
CToolbarButtons.Delete = Delete;
CToolbarButtons.Save = Save;
CToolbarButtons.Cancel = Cancel;
CToolbarButtons.Import = Import;
CToolbarButtons.Export = Export;
CToolbarButtons.Print = Print;
CToolbarButtons.Filter = Filter;
