import { IRoomGroupSuggestPaginationParams } from "@interfaces/room-group-suggests";

export interface IMFilterProps {
  params: IRoomGroupSuggestPaginationParams;
  onAdd: () => void;
  onSearch: (newParams: IRoomGroupSuggestPaginationParams) => void;
}
