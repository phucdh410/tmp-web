import { IParams } from "@modules/purchased-proposed-asset/types";

export interface IMFilter {
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
}
