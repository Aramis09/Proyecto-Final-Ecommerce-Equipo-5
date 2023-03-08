import { CardProps } from "../../types";
import styles from "./Card.module.scss";
import { Link } from 'react-router-dom';

export const Card = ({
  name,
  background_image,
  // platforms,
  price,
}: CardProps) => {
  // const platformsSlice = platforms.slice(0, 3);

  return (
		<div className={styles['card-container']}>
			<div className={styles.card}>
				<img src={background_image} alt={name} />
				<h3>{name}</h3>
				{/* <div className={styles["platforms-container"]}>
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
        </div> */}
				{price === 'free' ? <p>{`${price}`}</p> : <p>{`$${price}`}</p>}
				<button className={styles['form-button']}>Agregar Al Carrito</button>
			</div>
		</div>
	);
};
