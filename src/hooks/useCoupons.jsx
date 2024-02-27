/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-26 22:49:49
 * @modify date 2024-02-26 22:49:49
 * @desc 쿠폰 관련 훅
 */
import { useState,useEffect } from "react";
import { fetchCoupons } from "../services/couponService";

export const useCoupons = () => {
  const [coupons,setCoupons] = useState([]);

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const response = await fetchCoupons();
        setCoupons(response.data);
      } catch(error) {
        console.error("Faile to fetch coupons",error);
      }
    };

    loadCoupons();
  },[]);

  return coupons;
}