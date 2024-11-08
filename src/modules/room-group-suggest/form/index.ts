import { IRoomGroupSuggestPayload } from "@interfaces/room-group-suggests";

export const defaultValues: IRoomGroupSuggestPayload = {
  id: undefined,
  code: "",
  store_code: "",
  name: "",
  seating_capacity: 0,
  floor_area_min: 0,
  floor_area_max: 0,
  market_price: 0,
  criteria_code: "",
  amenities: [],
  rates: [],
};
