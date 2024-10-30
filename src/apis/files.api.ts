import { apiInstance } from "@axios/index";
import { modifyResponseStringToNumber } from "@funcs/response";
import { IApiResponse } from "@interfaces/response";
import { IUploadResponse } from "@interfaces/upload";

export const filesApi = {
  upload: async (file: File): Promise<IApiResponse<IUploadResponse>> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiInstance
      .post("/documents/upload", formData)
      .then((response) => modifyResponseStringToNumber(response, ["id"]));
  },
};
