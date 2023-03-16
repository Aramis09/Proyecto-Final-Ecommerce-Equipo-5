import { Card } from "../Card/Card";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import styles from "./Product.module.scss";
//import { Link } from "react-router-dom";
//import { useEffect } from "react";
//import { setSuccessMsg } from "../../redux/actions/shoppingCartAction";

export const Product = () => {
  let topProductsData = useAppSelector(
    (state) => state.productReducer.topProductsData
  );

  /*
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSuccessMsg(""))
  }, [])
  */

  return (
    <div
      className={
        topProductsData.length > 6 ? styles["cards-products"] : styles.cards
      }
    >
      {" "}
      {topProductsData.map((product: any, index: number) => {
        return (
          <div key={index} className={styles.card}>
            {/* <Link to={`/${product.id}`}> */}
            <Card
              key={index}
              id={product.id}
              name={product.name}
              background_image={product.background_image}
              platforms={product.platforms}
              price={product.price}
            />
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
};
