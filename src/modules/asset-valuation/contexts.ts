import { createContext } from "react";

import { IAssetValuationContext } from "@interfaces/asset-valuations";

export const DEFAULT_CONTEXT_VALUES = {
  calculateParams: { valuation_value: 0, asset_id: -1 },
  setCalculateParams: () => {},
};

export const AssetValuationContext = createContext<IAssetValuationContext>(
  DEFAULT_CONTEXT_VALUES
);
