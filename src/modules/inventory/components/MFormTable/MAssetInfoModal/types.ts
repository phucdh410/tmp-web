import { UseFieldArrayUpdate } from "react-hook-form";

import {
  IAssetInInventoryPayload,
  IInventoryPayload,
} from "@interfaces/inventories";

export interface IMAssetInfoModalRef {
  open: () => void;
}

export interface IMAssetInfoModalProps {
  data: IAssetInInventoryPayload;
  update: UseFieldArrayUpdate<IInventoryPayload, "stocktake_assets">;
  index: number;
}
