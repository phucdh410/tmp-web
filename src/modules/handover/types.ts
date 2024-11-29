import { HANDOVER_STATUSES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: "" | HANDOVER_STATUSES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}
