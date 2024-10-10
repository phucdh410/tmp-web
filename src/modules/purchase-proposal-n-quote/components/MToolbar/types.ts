import { IParams } from "@modules/purchase-proposal-n-quote/types";

export interface IMToolbar {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
