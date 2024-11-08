//note: USER & AUTHENTICATION
export interface IProfile {
  fullname: string;
  role: string;
  store_ids: string[];
  user_id: number;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IRefreshTokenPayload {
  refresh_token: string;
}
