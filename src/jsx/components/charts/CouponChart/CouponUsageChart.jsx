/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-03 01:39:03
 * @modify date 2024-03-03 01:39:03
 * @desc 쿠폰 사용률 통계 컴포넌트
 */
import React from "react";
import Chart from "react-apexcharts";
import { useState,useEffect } from "react";
import { fetchCouponUsageRates } from "services/couponService";

const CouponUsageChart = () => {
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCouponUsageRates();
        const usageRates = response.data.map(item => item.usageRate);
        setChartSeries(usageRates);
      } catch (error) {
        console.error('Error fetching coupon usage data:', error);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    labels: ['FREE', 'AMOUNT', 'PERCENT'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default CouponUsageChart;
