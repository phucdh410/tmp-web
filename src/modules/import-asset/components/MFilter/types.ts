import { IImportAssetPaginationParams } from "@interfaces/import-assets";

export interface IMFilter {
  params: IImportAssetPaginationParams;
  setParams: React.Dispatch<React.SetStateAction<IImportAssetPaginationParams>>;
}
