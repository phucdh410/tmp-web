import { HANDOVER_STATUSES } from "@constants/enums";

export interface IParams {
  page: number;
  limit: number;
  code?: string;
  store_code?: string;
  status?: "" | HANDOVER_STATUSES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}
