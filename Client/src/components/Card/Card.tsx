import { CardProps } from "../../types";
import styles from "./Card.module.css";

export const Card = ({ name, background_image, platforms, price }: CardProps) => {
  const platformsSlice = platforms.slice(0, 3);

  return (
    <div className={styles["card-container"]}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <img src={background_image} alt={name} />
        {platforms.length > 3
          ? platformsSlice.map((platform: any, index: any) => {
              return (
                
                <div className={styles.platforms} key={index}>
                  {platform}
                </div>
              );
            })
          : platforms.map((platform: any, index: any) => {
              return (
                <div className={styles.platforms} key={index}>
                  {platform}
                </div>
              );
            })}
        {price === "free" ? <p>{`${price}`}</p> : <p>{`$${price}`}</p>}
      </div>
    </div>
  );
};
