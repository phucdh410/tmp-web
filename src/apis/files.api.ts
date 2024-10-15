import { apiInstance } from "@axios/index";

export const filesApi = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiInstance.post("/files/upload", formData);
  },
};
