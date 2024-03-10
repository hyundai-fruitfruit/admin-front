/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 도넛모양 그래프
 */
import React from "react";
import { Doughnut } from "react-chartjs-2";

const ChartGenerationDoughnut = ({ color1, color2, color3, color4, height, width }) => {
  const data = {
    datasets: [
      {
        data: [40, 30, 20, 10],
        borderWidth: 0,
        backgroundColor: [
          `${color1 ? color1 : "rgba(58, 122, 254, 1)"}`,
          `${color2 ? color2 : "rgba(58, 122, 254, 0.7)"}`,
          `${color3 ? color3 : "rgba(58, 122, 254, 0.5)"}`,
          `${color4 ? color4 : "rgba(0, 0, 0, 0.07)"}`,
        ],
        hoverBackgroundColor: [
          `${color1 ? color1 : "rgba(58, 122, 254, 1)"}`,
          `${color2 ? color2 : "rgba(58, 122, 254, 0.7)"}`,
          `${color3 ? color3 : "rgba(58, 122, 254, 0.5)"}`,
          `${color4 ? color4 : "rgba(0, 0, 0, 0.07)"}`,
        ],
      },
    ],
    labels: ["20대", "30대", "40대", "50대 이상"],
  };

  const options = {
    plugins: {
      legend: false,
      responsive: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Doughnut data={data} height={height ? height : 270} width={width ? width : 270} options={options} />
    </>
  );
};

export default ChartGenerationDoughnut;
