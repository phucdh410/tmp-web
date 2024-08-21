export interface IProfile {
  fullname: string;
  role: string;
  store_ids: string[];
  user_id: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}
