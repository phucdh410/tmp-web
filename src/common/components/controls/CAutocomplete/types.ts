import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@interfaces/form";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";

export interface ICAutocompleteRef extends IFormInputComponentRef {}

export interface ICAutocompleteProps extends IFormInputComponentProps {
  options: IAutocompleteOption[];
  placeholder?: string;
  disableClearable?: boolean;
  get?: string;
  display?: string;
  onChange?: (
    value: any,
    event?: React.SyntheticEvent,
    selectedOption?: IAutocompleteOption | null,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
  ) => void;
}

export interface IAutocompleteOption {
  id: string | number;
  label: string;
  [key: string]: any;
}
