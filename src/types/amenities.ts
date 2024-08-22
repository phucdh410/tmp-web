//! TIỆN ÍCH PHÒNG
export interface IAmenityPayload {
  code?: string;
  id?: string;
  name: string;
  amenity_criteria_code: string;
  price: number;
  status: number;
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
