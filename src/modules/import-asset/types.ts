import { IMPORT_ASSET_STATUES } from "@constants/enums";

export interface IParams {
  page: number;
  limit: number;
  code?: string;
  warehouse_id?: "" | number;
  status?: "" | IMPORT_ASSET_STATUES;
  start_date?: null | string | Date;
  end_date?: null | string | Date;
  date?: null | string | Date;
}
