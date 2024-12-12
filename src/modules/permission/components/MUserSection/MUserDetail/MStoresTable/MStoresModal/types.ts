import { IStoreInUserDataPayload } from "@interfaces/permissions";
import { IStoreResponse } from "@interfaces/stores";

export interface IMStoresModalRef {
  open: () => void;
}

export interface IMStoresModalProps {
  existingStores: IStoreInUserDataPayload[];
  onAddStores: (addedStores: IStoreResponse[]) => void;
}
