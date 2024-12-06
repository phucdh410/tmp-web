import { ASSET_PROPOSAL_STATUSES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";
import { Dayjs } from "dayjs";

export interface IParams extends IBasePaginationParams {
  status?: "" | ASSET_PROPOSAL_STATUSES;
  proposed_date?: "" | string | Date | Dayjs | null;
}
