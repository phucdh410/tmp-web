import { SetStateAction } from "react";

import { IMFormProps } from "../types";

export interface IMAssetsProps extends Pick<IMFormProps, "control"> {
  selectedIndex: null | number;
  setSelectedIndex: React.Dispatch<SetStateAction<null | number>>;
}
