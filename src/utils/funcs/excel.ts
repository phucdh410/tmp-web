import { AxiosResponse } from "axios";

export const downloadExcel = (response: AxiosResponse, fileName = "report") => {
  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  link.download = `${fileName}.xlsx`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
