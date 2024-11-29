import { ASSET_VALUATION_STATUES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  store_code?: string;
  status?: ASSET_VALUATION_STATUES | "";
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}
