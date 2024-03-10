import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class RevisitBarCoupon extends Component {
  render() {
    const data = {
      labels: ["쿠폰 미사용", "쿠폰 사용"],
      datasets: [
        {
          label: "Dataset 1",
          data: [65, 82],
          borderColor: "rgba(58, 122, 254, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(58, 122, 254, 1)",
        },
        {
          label: "Dataset 2",
          data: [28, 48],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      },
    };

    return (
      <>
        <Bar data={data} options={options} height={300} width={300} />
      </>
    );
  }
}

export default RevisitBarCoupon;
