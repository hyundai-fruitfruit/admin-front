/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-04 15:33:17
 * @modify date 2024-03-04 15:33:17
 * @desc 쿠폰 발행률,쿠폰 사용률
 */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchCouponUsageRates } from "services/couponService";

const CouponUsageBarChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['FREE', 'AMOUNT', 'PERCENT'],
    },
    yaxis: {
      title: {
        text: '수량'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "개"
        }
      }
    }
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCouponUsageRates();
      const couponTypes = data.data.map(coupon => coupon.couponType);
      const issuedData = data.data.map(coupon => coupon.totalIssued);
      const usedData = data.data.map(coupon => coupon.totalUsed);

      // xaxis 카테고리 업데이트
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: { categories: couponTypes },
      }));

      // 시리즈 데이터 업데이트
      setSeries([
        { name: '실제 사용 수', data: usedData },
        { name: '쿠폰 발행 수', data: issuedData },
      ]);
    };

    loadData();
  }, []);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default CouponUsageBarChart;
