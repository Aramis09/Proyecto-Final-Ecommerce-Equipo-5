import { Card } from "../Card/Card";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";


export const Product = () => {
  let topProductsData = useAppSelector(
    (state) => state.productReducer.topProductsData
  );

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
              genres={product.genres}
              price={product.price}
            />
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
};
