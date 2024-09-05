import { ICButtonProps } from "../CButton/types";

export interface ICExcelButtonProps extends ICButtonProps {
  purpose: "import" | "export";
}

export interface ICImportPluginRef {
  click: () => void;
}

export interface ICImportPluginProps {
  onProceed: (file: File) => Promise<any>;
}
