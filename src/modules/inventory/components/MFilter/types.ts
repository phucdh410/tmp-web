import { IInventoryPaginationParams } from "@interfaces/inventories";

export interface IMFilter {
  params: IInventoryPaginationParams;
  setParams: React.Dispatch<React.SetStateAction<IInventoryPaginationParams>>;
}
