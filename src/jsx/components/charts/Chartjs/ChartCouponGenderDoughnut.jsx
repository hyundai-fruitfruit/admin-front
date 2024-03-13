/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 도넛모양 그래프
 */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchPromotionEffectStats } from "apis/request";

const ChartCouponGenderDoughnut = ({ color1, color2, height, width }) => {
  const [genderData, setGenderData] = useState([0, 0]); // 남성과 여성 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPromotionEffectStats();
        // API로부터 받은 데이터를 기반으로 남성과 여성의 쿠폰 사용 수를 계산
        let maleCount = 0;
        let femaleCount = 0;

        data.forEach((item) => {
          if (item.gender === "M") {
            maleCount += item.usageCount; 
          } else if (item.gender === "F") {
            femaleCount += item.usageCount; 
          }
        });

        setGenderData([maleCount, femaleCount]);
      } catch (error) {
        console.error("Error fetching promotion effect stats:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    datasets: [
      {
        data: genderData,
        borderWidth: 0,
        backgroundColor: [`${color1 || "#0687F5"}`, `${color2 || "#FD3C56"}`],
        hoverBackgroundColor: [`${color1 || "#0687F5"}`, `${color2 || "#FD3C56"}`],
      },
    ],
    labels: ["남성", "여성"],
  };

  const options = {
    plugins: {
      legend: false,
      responsive: true,
    },
    maintainAspectRatio: false,
  };

  return <Doughnut data={chartData} height={height || 270} width={width || 270} options={options} />;
};

export default ChartCouponGenderDoughnut;
