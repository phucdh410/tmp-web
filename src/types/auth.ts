export interface IProfile {
  username: string;
  id: string;
  fullname: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}
