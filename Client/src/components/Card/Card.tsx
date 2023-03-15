import { CardProps } from "../../types";
import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addNewProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

import { style } from "@mui/system";

export const Card = ({
  id,
  name,
  background_image,
  //platforms,
  price,
}: any) => {
  const { user }: any = useAuth0();
  //const platformsSlice = platforms.slice(0, 3);
  const dispatch = useAppDispatch();

  if (typeof user !== "undefined") {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartUser
    );
  } else {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartGuest
    );
  }

  const [successMsg, setSuccessMsg] = useState("");

  const addingToShoppingCart = (e: any) => {
    const game: object = {
      id,
      name,
      background_image,
      price,
    };
    const item = listProductsShoppingCart.find(
      (item: any) => item.id == parseInt(id)
    );

    if (!item) {
      if (typeof user !== "undefined") {
        dispatch(addNewProductInShoppingCart(id, user.email));
        dispatch(addAmountForShoppingCartUser(price));
      } else {
        dispatch(addShoppingCart(game));
      }

      setSuccessMsg(ADDED_TO_CART);
    } else {
      setSuccessMsg(ALREADY_IN_THE_CART);
    }
  };

  return (
    <>
      <div className={styles["card-container"]}>
        <div className={styles.card}>
          <Link to={`/${id}`}>
            <img src={background_image} alt={name} />
          </Link>
          <div className={styles.containerTittleAndPrice}>
            <h3>{name}</h3>
            {price === "free" ? <p>{`${price}`}</p> : <p>{`$${price}`}</p>}
          </div>
          <div className={styles.addShoppingCart}>
            <button type="button" onClick={addingToShoppingCart}>
              Agregar al carrito
            </button>
            <p>{successMsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};
