import { IExportAssetPaginationParams } from "@interfaces/export-assets";

export interface IMFilter {
  params: IExportAssetPaginationParams;
  setParams: React.Dispatch<React.SetStateAction<IExportAssetPaginationParams>>;
}
