export enum PERMISSION_TAB {
  USER = "user",
  GROUP = "group",
  REGION = "region",
}

export enum CONTROL_STATUS {
  IDLE = "idle",
  VIEWING = "viewing",
  EDITING = "editing",
}

export interface IControlContext {
  status: CONTROL_STATUS;
  setStatus: (status: CONTROL_STATUS) => void;
  id: string | number;
  setId: (id: string | number) => void;
}
