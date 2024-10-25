import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const random = (min = 50, max = 200) => {
  return Math.round(Math.random() * (max - min) + min);
};

const MOCK = [
  { name: "UVK", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "TN", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "XVNT", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "DBT", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "CCY", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "MĐC", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "VT", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "NTP", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "TT", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "PXL", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "HD2", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "PQ", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "QWE", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "RTY", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "UIO", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "ASD", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "FGH", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "JKL", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "ZXC", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
  { name: "VBN", gia_tri_1: 1, gia_tri_2: 1, gia_tri_3: 1 },
];

MOCK.forEach((e) => {
  e["gia_tri_1"] = random();
  e["gia_tri_2"] = random();
  e["gia_tri_3"] = random();
});

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
