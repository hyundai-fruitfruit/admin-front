/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-03-09 05:48:39
 * @modify date 2024-03-09 05:48:39
 * @desc 도넛모양 그래프
 */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchStoreAgeGenderStats } from "apis/request";

const ChartGenerationDoughnut = ({ color1, color2, color3, color4, height, width }) => {
  const [ageData, setAgeData] = useState([0, 0, 0, 0]); // 각 연령대 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStoreAgeGenderStats();
        // API로부터 받은 데이터를 기반으로 각 연령대별 방문 수를 계산
        const ageCounts = {
          "20s": 0,
          "30s": 0,
          "40s": 0,
          "50s+": 0,
        };

        data.forEach((item) => {
          if (ageCounts.hasOwnProperty(item.ageGroup)) {
            ageCounts[item.ageGroup] += item.visitCount;
          }
        });

        setAgeData([ageCounts["20s"], ageCounts["30s"], ageCounts["40s"], ageCounts["50s+"]]);
      } catch (error) {
        console.error("Error fetching store age gender stats:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    datasets: [
      {
        data: ageData,
        borderWidth: 0,
        backgroundColor: [color1 || "#0687F5", color2 || "#1DDE90", color3 || "#FDA52E", color4 || "#FD3C56"],
        hoverBackgroundColor: [color1 || "#0687F5", color2 || "#1DDE90", color3 || "#FDA52E", color4 || "#FD3C56"],
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

  return <Doughnut data={chartData} height={height || 270} width={width || 270} options={options} />;
};

export default ChartGenerationDoughnut;
