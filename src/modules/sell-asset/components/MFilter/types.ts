import { ISellAssetPaginationParams } from "@interfaces/sell-assets";

export interface IMFilter {
  params: ISellAssetPaginationParams;
  setParams: React.Dispatch<React.SetStateAction<ISellAssetPaginationParams>>;
}
