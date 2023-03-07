import { Card } from "../Card/Card";
import { useAppSelector } from "../../redux/hooks/hooks";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";

export const Product = () => {
  
  let topProductsData = useAppSelector((state) => state.productReducer.topProductsData)
  
  return (
    <div
      className={topProductsData.length > 6 ? styles["cards-products"] : styles.cards}
    >
      {" "}
      {topProductsData.map((product, index) => {
        return (
          <div key={index} className={styles.card}>
            <Link to={`/${product.id}`}>
              <Card
                key={index}
                name={product.name}
                background_image={product.background_image}
                platforms={product.platforms}
                price={product.price}
              />
            </Link>
            
          </div>
        );
      })}
    </div>
  );
};
