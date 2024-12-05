import { IAssetInAssetValuationPayload } from "@interfaces/asset-valuations";

export interface IMAddAssetProps {
  onAddNewAsset: (newAsset: IAssetInAssetValuationPayload) => void;
  store_code: string;
}
