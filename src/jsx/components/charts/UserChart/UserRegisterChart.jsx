/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-08 10:08:39
 * @modify date 2024-03-08 10:08:39
 * @desc 월별 등록 회원 수 및 전체 회원 수 컴포넌트
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';

const UserRegisterChart = (props) => {
    const data = {
        defaultFontFamily: 'Poppins',
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb", "Mar",],
        datasets: [{
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40, 88, 45, 95, 54, 76],
            borderColor: "rgba(0, 0, 0, 250)",
            borderWidth: "0",
            backgroundColor: "#a0bfff",
            hoverBackgroundColor: "#a0bfff",
            barPercentage: 0.3,
        }]
    };

    const options = {
        plugins: {
            legend: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false,
                max: 100,
                min: 0,
                ticks: {
                    beginAtZero: true,
                    display: false,
                    stepSize: 10
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            }
        }
    };

    return (
        <div>
            <Bar
                data={data}
                height={props.height ? props.height : 85}
                options={options}
            />
        </div>
    );
}

export default UserRegisterChart;
