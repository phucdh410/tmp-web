import { IParams } from "@modules/handover/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
