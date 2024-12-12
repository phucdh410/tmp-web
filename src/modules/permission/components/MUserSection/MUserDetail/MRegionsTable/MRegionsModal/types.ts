import { IArea, IAreaInUserDataPayload } from "@interfaces/permissions";

export interface IMRegionsModalRef {
  open: () => void;
}

export interface IMRegionsModalProps {
  existingAreas: IAreaInUserDataPayload[];
  onAddAreas: (addedAreas: IArea[]) => void;
}
