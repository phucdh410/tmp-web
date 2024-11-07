import { IParams } from "@modules/import-asset/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
