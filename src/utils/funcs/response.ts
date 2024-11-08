import { AxiosResponse } from "axios";

export const convertStringToNumber = (
  data: Record<string, any> | any[],
  keysToConvert: string[]
): Record<string, any> | any[] => {
  if (Array.isArray(data)) {
    // Nếu `data` là array, duyệt qua từng phần tử và gọi lại hàm đệ quy
    return data.map((item) => convertStringToNumber(item, keysToConvert));
  } else if (typeof data === "object" && data !== null) {
    // Nếu `data` là object, duyệt qua từng key
    const result: Record<string, any> = {};
    for (const key in data) {
      const value = data[key];
      if (
        keysToConvert.includes(key) &&
        typeof value === "string" &&
        !isNaN(Number(value))
      ) {
        // Nếu key nằm trong `keysToConvert` và giá trị là string có thể chuyển thành number
        result[key] = Number(value);
      } else if (typeof value === "object" && value !== null) {
        // Nếu giá trị là object hoặc array, gọi lại hàm đệ quy
        result[key] = convertStringToNumber(value, keysToConvert);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  return data; // Nếu không phải array hay object, trả về nguyên giá trị
};

export const modifyResponseStringToNumber = (
  response: AxiosResponse<any, any>,
  keysToConvert: string[]
): AxiosResponse<any, any> => {
  if (response.data.data) {
    response.data.data = convertStringToNumber(
      response.data.data,
      keysToConvert
    );
  }
  return response;
};

export const convertIdFieldsToNumber = (
  data: Record<string, any> | any[]
): Record<string, any> | any[] => {
  if (Array.isArray(data)) {
    return data.map((e) => convertIdFieldsToNumber(e));
  } else if (typeof data === "object") {
    if (data === null) {
      //note: Chưa biết làm gì với value null
      //note: trả về "" hay chính nó
      //TODO: Xử lý value null khi biết mình cần gì
      return data;
    }

    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        result[key] = value.map((e) => convertIdFieldsToNumber(e));
      } else if (typeof value === "object" && value !== null) {
        result[key] = convertIdFieldsToNumber(value);
      } else if (key.includes("id") && /^[0-9]+(\.[0-9]+)?$/.test(value)) {
        result[key] = Number(value);
      } else result[key] = value;
    }
    return result;
  }
  return data;
};
