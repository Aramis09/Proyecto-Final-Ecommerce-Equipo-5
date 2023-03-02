import { PRUEBA } from "../../prueba";
import { Card } from "../Card/Card";
import { Games } from "../../prueba-get";
import styles from "./Product.module.css";

export const Product = ({ limit }) => {
  const cardSlice = PRUEBA.slice(0, limit);

  return (
    <div className={styles.cards}>
      {cardSlice.map((product, index) => {
        return (
          <div key={index} className={styles.card}>
            <Card
              key={index}
              name={product.name}
              background_image={product.background_image}
              platforms={product.platforms}
              price={product.price}
            />
          </div>
        );
      })}
    </div>
  );
};
