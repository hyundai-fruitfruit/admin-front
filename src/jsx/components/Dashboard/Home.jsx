/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-08 09:17:22
 * @modify date 2024-03-08 09:17:22
 * @desc 쿠폰,이벤트,월별 증가 회원 통계
 */
import React,{useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import { Sparklines, SparklinesLine} from "react-sparklines";


//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import PaymentTable from './Elements/PaymentTable';
import TopProducts from './Elements/TopProducts';
import TopEventRates from './Elements/TopEventRates'
import ActivityTab from './Elements/ActivityTab';
import UserActivity from './Elements/UserActivity';
import CouponUsageChart from '../charts/CouponChart/CouponUsageChart';
import '../charts/CouponChart/CouponChartCss.css'
import CouponUsageBarChart from '../charts/CouponChart/CouponUsageBarChart';
import UserRegisterChart from '../charts/UserChart/UserRegisterChart';
import ChartGenderDoughnut from '../charts/Chartjs/ChartGenderDoughnut';
import ChartCouponGenderDoughnut from '../charts/Chartjs/ChartCouponGenderDoughnut';
import ChartGenerationDoughnut from '../charts/Chartjs/ChartGenerationDoughnut';
import RecentVisit from '../charts/Chartjs/RecentVisit';
import RevisitBarSales from '../charts/Chartjs/revisitBarSales';
import RevisitBarCoupon from '../charts/Chartjs/revisitBarCoupon';


const AreaChart2Canvas = loadable(() =>
	pMinDelay(import("./Elements/AreaChart2Canvas"), 1000)
);
const ChartWidget2 = loadable(() =>
	pMinDelay(import("./Elements/ChartWidget2"), 1000)
);
const ShareProfitCanvas2 = loadable(() =>
	pMinDelay(import("./Elements/ShareProfitCanvas2"), 1000)
);
const ActiveUserCanvas = loadable(() =>
	pMinDelay(import("./Elements/ActiveUserCanvas"), 1000)
);


const sampleData = [  6,2,8,4,3,8,4,3,6,5,9,2, ];

const Home = () => {
	const { 
        changeBackground,
        changeSideBarStyle,
        chnageSidebarColor,
        changeNavigationHader    
    } = useContext(ThemeContext);
	  useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        changeSideBarStyle({ value: "mini", label: "Mini" });
        chnageSidebarColor("color_3");
        changeNavigationHader("color_3");
	}, []);
	return(
		<>
			<AllSection />
		</>
	)
}

function AllSection(){
    return(        
        <div className="row">
            <div className="col-xl-9 col-xxl-12">
                <div className="row">
                    <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                        <div className="card-body pb-0 px-4 pt-4">
                            <div className="row">
                            <div className="col">
                                <h3 className="mb-1">매장 이용 연령대</h3>
                            </div>
                            </div>
                        </div>
                        <div className="chart-wrapper mx-4">
                            <ChartGenerationDoughnut />
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                        <div className="card-body pb-0 px-4 pt-4">
                            <div className="row">
                            <div className="col">
                                <h3 className="mb-1">매장 이용 성비</h3>
                            </div>
                            </div>
                        </div>
                        <div className="chart-wrapper mx-4">
                            <ChartGenderDoughnut />
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                        <div className="card overflow-hidden">
                        <div className="card-body pb-0 px-4 pt-4">
                            <div className="row">
                            <div className="col text-white">
                                <h3 className="mb-1">쿠폰 이용 성비</h3>
                            </div>
                            </div>
                        </div>
                        <div className="chart-wrapper mx-4">
                            <ChartCouponGenderDoughnut />
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                        <div className="overflow-hidden card bg-primary">
                            <div className="px-4 pt-4 pb-0 card-body">
                                <div className="row">
                                    <div className="text-white col">
                                        <span>1년간 월별 증가 회원수</span>
                                        <h5 className="mb-2 text-white">570</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2 chart-wrapper">									
                                <UserRegisterChart />
                            </div>
                        </div>
                    </div>		
                    <div className="col-xl-4 col-xxl-4 col-lg-12 col-md-12">
                        <div className="text-white card bg-secondary">
                                <div className="pb-0 border-0 card-header">
                                    <h4 className="text-white card-title">이벤트 참여율 TOP 5</h4>
                                </div>
                            <TopEventRates />
                        </div>	
                    </div>	
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">쿠폰 유형별 사용률</h4>
                            </div>
                            <div className="card-body">
                                <div className='chart-container'>
                                    <CouponUsageChart/>
                                    <CouponUsageBarChart/>
                                </div>
                            </div>
                        </div>	
                    </div>
                </div>	
            </div>	
            <div className="col-xl-3 col-xxl-4 col-lg-12 col-md-12">
                <div className="text-white card bg-primary">
                    <div className="pb-0 border-0 card-header">
                        <h4 className="text-white card-title">현재 진행중인 이벤트 목록</h4>
                    </div>
                    <TopProducts />
                </div>	
            </div>
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6">
                <div className="card activity_overview">
                <div className="card-header  border-0 pb-3 ">
                    <h4 className="card-title">재방문율</h4>
                </div>
                <div className="m-2">
                    <RevisitBarCoupon />
                </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6">
                <div className="card activity_overview">
                <div className="card-header  border-0 pb-3 ">
                    <h4 className="card-title">쿠폰 사용 매출</h4>
                </div>
                <div className="m-2">
                    <RevisitBarSales />
                </div>
                </div>
            </div>
            <div className="col-xl-6 col-xxl-12 col-lg-12 col-md-12">
                <div className="card bg-white activity_overview">
                <div className="card-header  border-0 pb-3 ">
                    <h4 className="card-title">시간대별 매장 이용객 수</h4>
                </div>
                <RecentVisit />
                </div>
            </div>
                </div>	
    )
}

export {AllSection};
export default Home;