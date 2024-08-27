import { IRateInRoomGroupPayload } from "@interfaces/room-group-suggests";

export interface IMModalRef {
  open: (rateData?: IRateInRoomGroupPayload, index?: number) => void;
}

export interface IMModalProps {
  onCreate: (rateDate: IRateInRoomGroupPayload) => void;
  onUpdate: (rateDate: IRateInRoomGroupPayload, index: number) => void;
}
