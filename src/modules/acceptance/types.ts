import { ACCEPTANCE_STATUSES } from "@constants/enums";

export interface IParams {
  page: number;
  limit: number;
  code?: string;
  store_code?: string;
  status?: "" | ACCEPTANCE_STATUSES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
}
