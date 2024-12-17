import { IPurchasedProposedAssetPaginationParams } from "@interfaces/purchased-proposed-assets";

export interface IMFilter {
  params: IPurchasedProposedAssetPaginationParams;
  setParams: React.Dispatch<
    React.SetStateAction<IPurchasedProposedAssetPaginationParams>
  >;
}
