import { Control } from "react-hook-form";

export interface IWarehouseInput {
  warehouse_id: number;
}

export interface ICWarehouseInputProps<T extends IWarehouseInput> {
  control: Control<T, any>;
  isEdit?: boolean;
}
