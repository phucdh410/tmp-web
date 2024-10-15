import { IParams } from "@modules/purchase-proposal-n-quote/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
