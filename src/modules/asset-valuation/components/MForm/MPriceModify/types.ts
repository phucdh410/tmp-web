import { IAssetInformation } from "@interfaces/asset-valuations";

import { IMFormProps } from "../types";

export interface IMPriceModifyProps extends Pick<IMFormProps, "control"> {
  index: null | number;
  data?: IAssetInformation;
}
