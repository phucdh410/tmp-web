import { createContext } from "react";

import { ICalculateParams } from "./types";

export const DEFAULT_CONTEXT_VALUES = {
  calculateParams: { valuation_value: 0, asset_id: -1 },
  setCalculateParams: (newCalculateParams: ICalculateParams) => {},
};

export const AssetValuationContext = createContext(DEFAULT_CONTEXT_VALUES);
