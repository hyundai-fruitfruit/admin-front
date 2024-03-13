/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 시간대별 이용객수 
 */
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchStoreUsageStats } from "apis/request";

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
const RecentVisit = () => {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStoreUsageStats();
        // response 데이터 구조에 따라 각 시간대별로 데이터 추출
        const data9To11 = response.map((item) => item.time9To11);
        const data11To13 = response.map((item) => item.time11To13);
        const data13To15 = response.map((item) => item.time13To15);
        const data15To17 = response.map((item) => item.time15To17);
        const data17To19 = response.map((item) => item.time17To19);

        setChartData({
          defaultFontFamily: "line",
          labels: ["9시", "10시", "11시", "12시", "13시", "14시", "15시", "16시", "17시", "18시"],
          datasets: [
            {
              label: "방문자 수",
              data: [...data9To11, ...data11To13, ...data13To15, ...data15To17, ...data17To19],
              borderColor: "rgba(58, 122, 254, 1)",
              borderWidth: "2",
              backgroundColor: "rgba(58, 122, 254, 0.5)",
              pointBackgroundColor: "rgba(58, 122, 254, 1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching store usage stats:", error);
      }
    };

    fetchData();
  }, []);

  return <Line data={chartData} options={options} height={150} />;
};

export default RecentVisit;
