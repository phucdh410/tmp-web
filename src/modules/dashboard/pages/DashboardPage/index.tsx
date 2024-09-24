import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const MOCK = [
  { name: "UVK", gia_tri_1: 417, gia_tri_2: 90, gia_tri_3: 136 },
  { name: "TN", gia_tri_1: 159, gia_tri_2: 191, gia_tri_3: 283 },
  { name: "XVNT", gia_tri_1: 330, gia_tri_2: 184, gia_tri_3: 115 },
  { name: "DBT", gia_tri_1: 310, gia_tri_2: 176, gia_tri_3: 299 },
  { name: "CCY", gia_tri_1: 422, gia_tri_2: 77, gia_tri_3: 270 },
  { name: "MĐC", gia_tri_1: 166, gia_tri_2: 184, gia_tri_3: 225 },
  { name: "VT", gia_tri_1: 163, gia_tri_2: 183, gia_tri_3: 141 },
  { name: "NTP", gia_tri_1: 387, gia_tri_2: 112, gia_tri_3: 109 },
  { name: "TT", gia_tri_1: 350, gia_tri_2: 86, gia_tri_3: 191 },
  { name: "PXL", gia_tri_1: 103, gia_tri_2: 163, gia_tri_3: 175 },
  { name: "HD2", gia_tri_1: 142, gia_tri_2: 121, gia_tri_3: 280 },
  { name: "PQ", gia_tri_1: 387, gia_tri_2: 92, gia_tri_3: 122 },
  { name: "QWE", gia_tri_1: 243, gia_tri_2: 189, gia_tri_3: 282 },
  { name: "RTY", gia_tri_1: 236, gia_tri_2: 140, gia_tri_3: 167 },
  { name: "UIO", gia_tri_1: 130, gia_tri_2: 176, gia_tri_3: 134 },
  { name: "ASD", gia_tri_1: 369, gia_tri_2: 152, gia_tri_3: 289 },
  { name: "FGH", gia_tri_1: 299, gia_tri_2: 78, gia_tri_3: 235 },
  { name: "JKL", gia_tri_1: 214, gia_tri_2: 192, gia_tri_3: 147 },
  { name: "ZXC", gia_tri_1: 104, gia_tri_2: 129, gia_tri_3: 248 },
  { name: "VBN", gia_tri_1: 349, gia_tri_2: 65, gia_tri_3: 201 },
];

const DashboardPage = () => {
  const gia_tri_1 = MOCK.map((e) => e.gia_tri_1);
  const gia_tri_2 = MOCK.map((e) => e.gia_tri_2);
  const gia_tri_3 = MOCK.map((e) => e.gia_tri_3);
  return (
    <>
      <Bar
        options={{
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
              },
              border: {
                color: "rgb(0 0 0 / 4%)",
              },
            },
            y: {
              stacked: true,
              grid: {
                display: true,
                color: "rgb(0 0 0 / 3%)",
              },
            },
          },
        }}
        data={{
          labels: MOCK.map((e) => e.name),
          datasets: [
            {
              label: "Giá trị 1",
              data: gia_tri_1,
              borderRadius: 8,
              maxBarThickness: 40,
              backgroundColor: "#104C82",
              hoverBackgroundColor: "#104C82",
            },
            {
              label: "Giá trị 2",
              data: gia_tri_2,
              borderRadius: 8,
              maxBarThickness: 40,
              backgroundColor: "#569EDF",
              hoverBackgroundColor: "#569EDF",
            },
            {
              label: "Giá trị 3",
              data: gia_tri_3,
              borderRadius: 8,
              maxBarThickness: 40,
              backgroundColor: "#C7DCF0",
              hoverBackgroundColor: "#C7DCF0",
            },
          ],
        }}
      />
    </>
  );
};
export default DashboardPage;
