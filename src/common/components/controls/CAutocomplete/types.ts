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
    selectedOption?: IAutocompleteOption | IAutocompleteOption[] | null,
    reason?: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
  ) => void;
  hoverable?: boolean;
  disablePortal?: boolean;
  optionAll?: boolean;
  creatable?: boolean;
  onCreateClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    input?: string
  ) => void;
  multiple?: boolean;
  noOptionsText?: React.ReactNode;
  renderOption?: (
    props: object,
    option: IAutocompleteOption,
    state: object,
    ownerState: object
  ) => React.ReactNode;
  easyCreate?: (inputValue: string) => void | Promise<void>;
  hidePopupIcon?: boolean;
  getOptionDisabled?: (option: IAutocompleteOption) => boolean;
  loading?: boolean;
  loadingText?: string;
  loadMore?: {
    hasMore: boolean;
    fetchMore: () => void;
  };
  isDirtyOptions?: boolean;
  virtual?: boolean;
}

export interface IAutocompleteOption {
  id: number | string;
  label: string;
  [key: string]: any;
}
