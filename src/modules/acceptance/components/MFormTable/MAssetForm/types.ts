import { IAssetInAcceptancePayload } from "@interfaces/acceptances";

export interface IMAssetFormRef {
  edit: (index: number, editData: IAssetInAcceptancePayload) => void;
}

export interface IMAssetFormProps {
  onAdd: (newAsset: IAssetInAcceptancePayload) => void;
  onSave: (index: number, updatedAsset: IAssetInAcceptancePayload) => void;
}
