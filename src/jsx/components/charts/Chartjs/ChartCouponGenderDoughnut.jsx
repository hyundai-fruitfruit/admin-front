/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 도넛모양 그래프
 */
import React from "react";
import { Doughnut } from "react-chartjs-2";

const ChartCouponGenderDoughnut = ({ color1, color2, color3, color4, height, width }) => {
  const data = {
    datasets: [
      {
        data: [21, 79],
        borderWidth: 0,
        backgroundColor: [`${color1 ? color1 : "rgba(58, 122, 254, 1)"}`, `${color2 ? color2 : "rgba(58, 122, 254, 0.7)"}`],
        hoverBackgroundColor: [`${color1 ? color1 : "rgba(58, 122, 254, 1)"}`, `${color2 ? color2 : "rgba(58, 122, 254, 0.7)"}`],
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

export default ChartCouponGenderDoughnut;
