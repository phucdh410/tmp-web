import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  amenity_criteria_code?: string;
  status: number;
}
