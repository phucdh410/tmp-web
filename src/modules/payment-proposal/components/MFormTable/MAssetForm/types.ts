import { IAssetInPaymentProposalPayload } from "@interfaces/payment-proposals";

export interface IMAssetFormRef {
  edit: (index: number, editData: IAssetInPaymentProposalPayload) => void;
}

export interface IMAssetFormProps {
  onAdd: (newAsset: IAssetInPaymentProposalPayload) => void;
  onSave: (index: number, updatedAsset: IAssetInPaymentProposalPayload) => void;
}
