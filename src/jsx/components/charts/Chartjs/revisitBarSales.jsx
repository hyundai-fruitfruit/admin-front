import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class RevisitBarSales extends Component {
  render() {
    const data = {
      labels: ["이벤트 미참여", "이벤트 참여"],
      datasets: [
        {
          label: "Dataset 1",
          data: [1, 1.8],
          borderColor: ["rgba(58, 122, 254, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: "0",
          backgroundColor: ["rgba(58, 122, 254, 1)", "rgba(255, 99, 132, 1)"],
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
          ticks: {
            display: false,
          },
          beginAtZero: true,
          max: 2.5,
        },
        x: {
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      },
    };

    return (
      <>
        <Bar data={data} options={options} height={500} width={300} />
      </>
    );
  }
}

export default RevisitBarSales;
