//! TIỆN ÍCH PHÒNG
export interface IAmenitiesPayload {
  code?: string;
  name: string;
  amenityCriteriaCode: string;
  price: number;
  active: boolean;
}
