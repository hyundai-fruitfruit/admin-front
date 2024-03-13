/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 이벤트에 따른 재방문률
 */
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchRevisitRates } from "apis/request";

const RevisitBarCoupon = () => {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRevisitRates();
        const couponUsed = data.filter((item) => item.eventParticipation === "Y").map((item) => item.revisitRate);
        const couponNotUsed = data.filter((item) => item.eventParticipation === "N").map((item) => item.revisitRate);

        setChartData({
          labels: ["쿠폰 미사용", "쿠폰 사용"],
          datasets: [
            {
              label: "재방문률",
              data: [couponNotUsed, couponUsed],
              borderColor: "rgba(58, 122, 254, 1)",
              backgroundColor: "rgba(58, 122, 254, 1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revisit rates:", error);
      }
    };

    fetchData();
  }, []);

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

  return <Bar data={chartData} options={options} height={500} width={300} />;
};

export default RevisitBarCoupon;
