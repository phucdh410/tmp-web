import { ASSET_VALUATION_STATUES } from "@constants/enums";

export interface IParams {
  page: number;
  limit: number;
  code?: string;
  store_code?: string;
  status?: ASSET_VALUATION_STATUES | "";
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}
