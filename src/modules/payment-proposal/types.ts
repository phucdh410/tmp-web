import { PAYMENT_PROPOSAL_STATUSES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: "" | PAYMENT_PROPOSAL_STATUSES;
  // suggest_date?: null | string | Date;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}
