/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 이벤트에 따른 효과
 */
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchPromotionEffectStats } from "apis/request";

const RevisitBarSales = () => {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPromotionEffectStats();
        const salesBeforeEvent = data.map((item) => item.salesBeforeCoupon).reduce((acc, cur) => acc + cur, 0);
        const salesDuringEvent = data.map((item) => item.salesDuringCoupon).reduce((acc, cur) => acc + cur, 0);

        setChartData({
          labels: ["이벤트 미참여", "이벤트 참여"],
          datasets: [
            {
              label: "매출",
              data: [salesBeforeEvent, salesDuringEvent],
              borderColor: ["rgba(58, 122, 254, 1)", "rgba(255, 99, 132, 1)"],
              backgroundColor: ["rgba(58, 122, 254, 1)", "rgba(255, 99, 132, 1)"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching promotion effect stats:", error);
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

  return <Bar data={chartData} options={options} height={500} width={300} />;
};

export default RevisitBarSales;
