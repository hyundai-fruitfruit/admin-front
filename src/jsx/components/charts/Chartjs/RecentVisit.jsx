import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  defaultFontFamily: "line",
  labels: ["9시", "10시", "11시", "12시", "13시", "14시", "15시", "16시", "17시", "18시"],
  datasets: [
    {
      label: "My First dataset",
      data: [25, 70, 60, 81, 35, 25, 40, 15, 26, 60],
      borderColor: "rgba(58, 122, 254, 1)",
      borderWidth: "2",
      backgroundColor: "rgba(58, 122, 254,1)",
      pointBackgroundColor: "rgba(58, 122, 254,1)",
    },
  ],
};

const options = {
  plugins: {
    legend: false,
    tooltip: {
      intersect: false,
    },
    hover: {
      // mode: "nearest",
      intersect: true,
    },
  },
  scales: {
    y: {
      max: 100,
      min: 0,
      ticks: {
        beginAtZero: true,
        stepSize: 20,
        padding: 10,
      },
    },

    x: {
      ticks: {
        padding: 5,
      },
    },
  },
};
class RecentVisit extends Component {
  render() {
    return <Line data={data} options={options} height={150} />;
  }
}

export default RecentVisit;
