import React from 'react';
import { useAppSelector } from "../../redux/hooks/hooks";
import style from "./ShowDailyDiscount.module.scss";

interface TodaysDiscount {
    genre: string;
    discount: number;
  }

export const ShowDailyDiscount = ()=>{
    const todayDiscountObject = useAppSelector((state)=>state.productReducer.todaysDiscount as TodaysDiscount);
    console.log('soy ShowDailyDiscount y muestro el obj todayDiscount',todayDiscountObject)
    return(<div className={style['show-discount']}>
    {todayDiscountObject.discount}% off on {todayDiscountObject.genre} games.
    </div>)
}
