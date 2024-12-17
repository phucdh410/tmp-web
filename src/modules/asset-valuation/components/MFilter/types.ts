import { IAssetValuationPaginationParams } from "@interfaces/asset-valuations";

export interface IMFilter {
  params: IAssetValuationPaginationParams;
  setParams: React.Dispatch<
    React.SetStateAction<IAssetValuationPaginationParams>
  >;
}
