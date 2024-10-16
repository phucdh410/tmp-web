import { apiInstance } from "@axios/index";
import { IAcceptancePayload } from "@interfaces/acceptances";

export const acceptancesApi = {
  create: async (body: IAcceptancePayload) => {
    return apiInstance.post("/acceptances", body);
  },
};
