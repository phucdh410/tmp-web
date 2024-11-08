import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import { IApiResponse } from "@interfaces/response";
import { IWarehouse } from "@interfaces/warehouses";

export const warehousesApi = {
  getAll: async (): Promise<IApiResponse<IWarehouse[], any>> => {
    return apiInstance
      .get("/warehouses/all")
      .then((response) => modifyResponseStringToNumber(response, ["id"]));
  },
};
