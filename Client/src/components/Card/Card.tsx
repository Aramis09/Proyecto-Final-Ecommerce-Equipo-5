import { CardProps } from "../../types";
import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export const Card = ({
  id,
  name,
  background_image,
  platforms,
  price,
}: CardProps) => {
  const platformsSlice = platforms.slice(0, 3);

  const dispatch = useAppDispatch();
  const [successMsg, setSuccessMsg] = useState("");

  const addingToShoppingCart = (e: any) => {
    const game: object = {
      id,
      name,
      background_image,
      price,      
    }
    dispatch(addShoppingCart(game));
    setSuccessMsg("Agregado al carrito");
  }

  return (
    <div>
    <div className={styles["card-container"]}>
      <div className={styles.card}>
    <Link to={`/${id}`}>
        <img src={background_image} alt={name} />
    </Link>
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
        {price === "free" ? <p>{`${price}`}</p> : <p>{`$${price}`}</p>}
      </div>
    </div>
    <button type="button" onClick={addingToShoppingCart}>Agregar al carrito</button>
    <p>{successMsg}</p>
    </div>
  );
};
