import { PURCHASED_PROPOSED_ASSET_STATUSES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";
import { Dayjs } from "dayjs";

export interface IParams extends IBasePaginationParams {
  date_from?: "" | string | Date | Dayjs | null;
  date_to?: "" | string | Date | Dayjs | null;
  need_date_from?: "" | string | Date | Dayjs | null;
  need_date_to?: "" | string | Date | Dayjs | null;
  store_code?: string;
  user?: string;
  status?: "" | PURCHASED_PROPOSED_ASSET_STATUSES;
}
