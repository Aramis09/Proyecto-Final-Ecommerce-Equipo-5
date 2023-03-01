import { PRUEBA } from "../../prueba";
import { Card } from "../Card/Card";
import styles from "./Product.module.css";

export const Product = () => {
  return (
    <div className={styles.cards}>
      {PRUEBA.map((product, index) => {
        return (
          <div className={styles.card}>
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
