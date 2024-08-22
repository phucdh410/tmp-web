import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";

export interface ICAutocompleteRef extends IFormInputComponentRef {}

export interface ICAutocompleteProps extends IFormInputComponentProps {
  options: IAutocompleteOption[];
  placeholder?: string;
  disableClearable?: boolean;
  get?: string;
  display?: string;
}

export interface IAutocompleteOption {
  id: string | number;
  label: string;
  [key: string]: any;
}
