import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";

import { IMFormProps } from "../types";

export interface IMAssetInputProps
  extends Pick<IMFormProps, "control" | "setValue"> {
  assets: IAutocompleteOption[];
}
