import { IParams } from "@modules/asset-valuation/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
