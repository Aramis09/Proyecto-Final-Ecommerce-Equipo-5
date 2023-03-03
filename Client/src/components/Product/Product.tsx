import { Card } from "../Card/Card";
import { allGames } from "../../get";
import styles from "./Product.module.scss";

interface Props {
  limit: number;
}

export const Product = ({ limit }: Props) => {
  const cardSlice = allGames.slice(0, limit);

  return (
    <div
      className={cardSlice.length > 6 ? styles["cards-products"] : styles.cards}
    >
      {" "}
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
