import { Card } from "../Card/Card";
import { PRUEBA } from "../../prueba";
import { allGames } from "../../get";
import styles from "./Product.module.scss";

interface Props {
  limit: number;
}

export const Product = ({ limit }: Props) => {
  const cardSlice = allGames.slice(0, limit);

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