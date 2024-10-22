import { apiInstance } from "@axios/index";
import { IAssetProposal } from "@interfaces/outsides";
import { IApiResponse } from "@interfaces/response";

export const outsidesApi = {
  //note: Lấy danh sách phiếu đề xuất mua hàng
  getAllAssetProposals: async (): Promise<IApiResponse<IAssetProposal[]>> => {
    return apiInstance.get(
      "http://icool-staff-api-uat.vtcode.vn:3006/api/shared/asset-proposals/all"
    );
  },
};
