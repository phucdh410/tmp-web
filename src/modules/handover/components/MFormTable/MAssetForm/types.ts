import { IAssetInHandoverPayload } from "@interfaces/handovers";

export interface IMAssetFormRef {
  edit: (index: number, editData: IAssetInHandoverPayload) => void;
}

export interface IMAssetFormProps {
  onAdd: (newAsset: IAssetInHandoverPayload) => void;
  onSave: (index: number, updatedAsset: IAssetInHandoverPayload) => void;
}
