import { IAssetProposalPaginationParams } from "@interfaces/asset-proposals";

export interface IMFilter {
  params: IAssetProposalPaginationParams;
  setParams: React.Dispatch<
    React.SetStateAction<IAssetProposalPaginationParams>
  >;
}
