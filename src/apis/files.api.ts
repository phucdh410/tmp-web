import { apiInstance } from "@axios/index";
import { IApiResponse } from "@interfaces/response";
import { IUploadResponse } from "@interfaces/upload";

export const filesApi = {
  upload: async (
    file: File | FileList
  ): Promise<IApiResponse<IUploadResponse[]>> => {
    const formData = new FormData();
    if (file instanceof FileList) {
      Array.from(file).forEach((singleFile) => {
        formData.append("files", singleFile);
      });
    } else {
      formData.append("files", file);
    }
    return apiInstance.post("/documents/uploads", formData);
  },
};

// export const filesApi = {
//   upload: async (file: File): Promise<IApiResponse<IUploadResponse>> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     return apiInstance.post("/documents/upload", formData);
//   },
// };
