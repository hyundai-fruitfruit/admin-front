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

const ChartGenderDoughnut = ({ color1, color2, height, width }) => {
  const [genderData, setGenderData] = useState([0, 0]); // 남성과 여성 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStoreAgeGenderStats();
        // API로부터 받은 데이터를 기반으로 남성과 여성의 방문 수를 계산
        let maleCount = 0;
        let femaleCount = 0;

        data.forEach((item) => {
          if (item.gender === "남") {
            maleCount += item.visitCount;
          } else if (item.gender === "여") {
            femaleCount += item.visitCount;
          }
        });

        setGenderData([maleCount, femaleCount]);
      } catch (error) {
        console.error("Error fetching store age gender stats:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    datasets: [
      {
        data: genderData,
        borderWidth: 0,
        backgroundColor: [color1 || "#0687F5", color2 || "#FD3C56"],
        hoverBackgroundColor: [color1 || "#0687F5", color2 || "#FD3C56"],
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

  return <Doughnut data={chartData} height={height || 270} width={width || 270} options={options} />;
};

export default ChartGenderDoughnut;
