import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";

import { IAutocompleteOption } from "../CAutocomplete/types";

export interface ICSelectRef extends IFormInputComponentRef {}

export interface ICSelectProps extends IFormInputComponentProps {
  options: IAutocompleteOption[];
  placeholder?: string;
  optionAll?: boolean;
  display?: string;
  get?: string;
}
