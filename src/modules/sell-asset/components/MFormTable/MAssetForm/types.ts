import { IAssetInSellAssetPayload } from "@interfaces/sell-assets";

export interface IMAssetFormRef {
  edit: (index: number, editData: IAssetInSellAssetPayload) => void;
}

export interface IMAssetFormProps {
  onAdd: (newAsset: IAssetInSellAssetPayload) => void;
  onSave: (index: number, updatedAsset: IAssetInSellAssetPayload) => void;
}
