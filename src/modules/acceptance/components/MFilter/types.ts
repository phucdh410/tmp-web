import { IAcceptancePaginationParams } from "@interfaces/acceptances";

export interface IMFilter {
  params: IAcceptancePaginationParams;
  setParams: React.Dispatch<React.SetStateAction<IAcceptancePaginationParams>>;
}
