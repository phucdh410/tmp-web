import { apiInstance } from "@axios/index";
import { IHandoverOfAssetPayload } from "@interfaces/handover-of-assets";

export const handoverOfAssetsApi = {
  create: async (body: IHandoverOfAssetPayload) => {
    return apiInstance.post("/handover-of-asset", body);
  },
};
