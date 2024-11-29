import { EXPORT_ASSET_STATUES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  warehouse_id?: "" | number;
  status?: "" | EXPORT_ASSET_STATUES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  date?: null | string | Date;
}
