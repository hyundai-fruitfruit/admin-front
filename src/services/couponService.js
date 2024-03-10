/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-26 09:47:16
 * @modify date 2024-03-10 15:43:43
 * @desc 쿠폰관련 서비스 레이아웃
 */

import axios from 'axios';


const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/coupons`;
//const BASE_URL = '/api/v1/admin/coupons'
const AUTH_HEADERS = { 
    'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
};


export const fetchCoupons = async () => {
    const response = await axios.get(BASE_URL, {
        headers: AUTH_HEADERS
    });
    return response.data;
};

export const fetchCouponUsageRates = async () => {
    const response = await axios.get(`${BASE_URL}/statistics`, {
        headers: AUTH_HEADERS
    });
    return response.data;
};
