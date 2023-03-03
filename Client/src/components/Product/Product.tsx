import { useEffect } from "react";
//import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useAppDispatch, useAppSelector } from "../../redux_2/hooks/hooks";
//import { getAll } from "../../redux/actions/actions";
import { getAllListProducts } from "../../redux_2/actions/productAction";
import { Card } from "../Card/Card";
import styles from "./Product.module.css";

export const Product = () => {

  const dispatch = useAppDispatch();
  var storeState = useAppSelector((state) => state.productReducer.all)

  useEffect(() => {
    dispatch(getAllListProducts())
  }, [])

  console.log('debug product', storeState) //debug

  return (
    <div className={styles.cards} >
      {
        
        storeState.length>0 &&
        storeState.slice(0, 6).map((item: any, index: number) => {
          return(
            <div key={index} className={styles.card}>
              <Card 
                name={item.name}
                background_image={item.background_image}
                platforms={item.platforms}
                price={item.price}
              />
            </div>
          )
        })
        
        }
    </div>
  );
};
