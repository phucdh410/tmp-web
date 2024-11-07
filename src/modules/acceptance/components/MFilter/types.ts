import { IParams } from "@modules/acceptance/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
