import { CardProps } from "../../types";
import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";

export const Card = ({
  id,
  name,
  background_image,
  platforms,
  price,
}: CardProps) => {
  const platformsSlice = platforms.slice(0, 3);

  const dispatch = useAppDispatch();
  let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
  const [successMsg, setSuccessMsg] = useState("");

  const addingToShoppingCart = (e: any) => {
    const game: object = {
      id,
      name,
      background_image,
      price,      
    }
    const item = listProductsShoppingCart.find(item => item.id == parseInt(id));
    if(!item){
      dispatch(addShoppingCart(game));
      setSuccessMsg(ADDED_TO_CART);
    }else{
      setSuccessMsg(ALREADY_IN_THE_CART);
    }
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
