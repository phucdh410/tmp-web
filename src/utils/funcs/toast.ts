import { toast as Toast } from "react-toastify";

export const toast = {
  success: (content: string) => {
    Toast.success(content);
  },
  error: (content: string) => {
    Toast.error(content);
  },
};
