import { PURCHASED_PROPOSED_ASSET_STATUSES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";
import { Dayjs } from "dayjs";

export interface IParams extends IBasePaginationParams {
  start_date?: "" | string | Date | Dayjs | null;
  end_date?: "" | string | Date | Dayjs | null;
  start_needed_date?: "" | string | Date | Dayjs | null;
  end_needed_date?: "" | string | Date | Dayjs | null;
  store_code?: string;
  status?: "" | PURCHASED_PROPOSED_ASSET_STATUSES;
}
