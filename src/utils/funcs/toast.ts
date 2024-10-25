import { toast as Toast } from "react-toastify";

export const toast = {
  success: (content: string) => {
    Toast.success(content);
  },
  error: (content: string) => {
    Toast.error(content);
  },
};

//note: Để đồng bộ các thông báo giống cấu trúc nhau
export const MESSAGES = (keyName: string = "") => {
  return {
    SUCCESS: {
      CREATE: `Thêm ${keyName} thành công!`,
      UPDATE: `Cập nhật ${keyName} thành công!`,
      REMOVE: `Xóa ${keyName} thành công!`,
      SAVE: `Lưu thông tin ${keyName} thành công!`,
    },
    ERROR: {
      CREATE: `Thêm ${keyName} không thành công!`,
      UPDATE: `Cập nhật ${keyName} không thành công!`,
      REMOVE: `Xóa ${keyName} không thành công!`,
      SAVE: `Lưu thông tin ${keyName} không thành công!`,
      GET_DETAIL: `Không thể lấy thông tin ${keyName}!`,
    },
  };
};
