import { UseFieldArrayUpdate } from "react-hook-form";

import {
  IAssetInInventoryPayload,
  IInventoryPayload,
} from "@interfaces/inventories";

export interface IMEditAssetInfoProps {
  data: IAssetInInventoryPayload;
  update: UseFieldArrayUpdate<IInventoryPayload, "stocktake_assets">;
  index: number;
}
