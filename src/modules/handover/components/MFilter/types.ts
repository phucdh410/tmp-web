import { IHandoverPaginationParams } from "@interfaces/handovers";

export interface IMFilter {
  params: IHandoverPaginationParams;
  setParams: React.Dispatch<React.SetStateAction<IHandoverPaginationParams>>;
}
