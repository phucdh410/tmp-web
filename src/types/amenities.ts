//! TIỆN ÍCH PHÒNG
export interface IAmenitiesPayload {
  code?: string;
  name: string;
  amenityCriteriaCode: string;
  price: number;
  active: boolean;
}

export interface IAmenity {
  status: number;
  amenity_criteria_code: string;
  amenity_criteria_name: string;
  code: string;
  id: string;
  name: string;
  price: number;
}

export interface ICriteria {
  active: boolean;
  code: string;
  id: string;
  name: string;
}
