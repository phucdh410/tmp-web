import { IAssetInAll } from "@interfaces/assets";

export interface IMAssetsSelectionModalRef {
  open: () => void;
}

export interface IMAssetsSelectionModalProps {
  store_code: string;
  existedCodes: string[];
  onGetAssets: (newAssets: IAssetInAll[]) => void;
}
