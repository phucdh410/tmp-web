import { PURCHASED_PROPOSED_ASSET_STATUSES } from "@constants/enums";

export interface IMUpdateStatusModalRef {
  open: (
    id: number | string,
    initialStatus?: PURCHASED_PROPOSED_ASSET_STATUSES
  ) => void;
}

export interface IMUpdateStatusModalProps {
  refetch?: () => void;
}
