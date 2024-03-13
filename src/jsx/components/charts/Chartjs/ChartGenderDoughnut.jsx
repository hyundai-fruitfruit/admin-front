/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 도넛모양 그래프
 */
import React from "react";
import { Doughnut } from "react-chartjs-2";

const ChartGenderDoughnut = ({ color1, color2, color3, color4, height, width }) => {
  const data = {
    datasets: [
      {
        data: [32, 68],
        borderWidth: 0,
        backgroundColor: [`${color1 ? color1 : "#0687F5"}`, `${color2 ? color2 : "#FD3C56"}`],
        hoverBackgroundColor: [`${color1 ? color1 : "#0687F5"}`, `${color2 ? color2 : "#FD3C56"}`],
      },
    ],
    labels: ["남", "여"],
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

export default ChartGenderDoughnut;
