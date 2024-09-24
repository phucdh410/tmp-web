import { IRoom } from "@interfaces/rooms";

export interface IMModalRef {
  open: (data?: IRoom) => void;
}

export interface IMModalProps {
  refetch: () => void;
}
