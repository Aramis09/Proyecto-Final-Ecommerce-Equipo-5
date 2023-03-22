import { CardProps } from "../../types";
import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addNewProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { saveShoppingCartInLocalStorage } from "../../redux/actions/localStorageAction";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

import { style } from "@mui/system";
import {
  addProductToWishList,
  checkIfProductWasPurchased,
} from "../../Controller/cardController";
import { setwishList } from "../../redux/reducer/wishReducer";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres,
  state,
}: any) => {
  const { user }: any = useAuth0();
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [control, setControl] = useState(-1);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const dispatch = useAppDispatch();
  let totalPrice = useAppSelector(
    (state) => state.shoppingCartReducer.totalAmount
  );
  const [saveInLocalStorage, setSaveInLocalStorage] = useState(false);
  var todaysDiscount = useAppSelector(
    (state) => state.productReducer.todaysDiscount
  );

  useEffect(() => {
    if (saveInLocalStorage === true) {
      dispatch(
        saveShoppingCartInLocalStorage(listProductsShoppingCart, totalAmount)
      );
    }
    //esto verifica si el producto esta comprado, para cambiar el boton
    if (user) {
      checkIfProductWasPurchased(user.email, id).then((check) =>
        check
          ? setChangeClass({
              classButton: styles.buttonHide,
              classCard: styles.cardContainerBuy,
            })
          : setChangeClass({
              classButton: styles.buttonAdd,
              classCard: styles.cardContainer,
            })
      );
    }
  }, [control, user]);
  useEffect(() => {
    if (
      parseFloat(price) !== 0 &&
      todaysDiscount.discount !== "No_Discount" &&
      genres.includes(todaysDiscount.genre) &&
      parseFloat(price) !== discountPrice &&
      !discountApplied
    ) {
      let finalPrice =
        ((100 - todaysDiscount.discount) * parseFloat(price)) / 100;
      finalPrice = finalPrice.toFixed(2);
      setDiscountApplied((prev) => (prev = true));
      setDiscountPrice(finalPrice);
    }
  }, [price]);

  if (typeof user !== "undefined") {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartUser
    );
  } else {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartGuest
    );
    var totalAmount: number = totalPrice;
  }

  const addingToShoppingCart = (e: any) => {
    const game: object = {
      id,
      name,
      background_image,
      price,
      genres,
    };
    const item = listProductsShoppingCart.find(
      (item: any) => item.id == parseInt(id)
    );

    if (!item) {
      //Si no esta el Producto en el carrito y
      if (user) {
        //si existe un usuario lo agrega al Carrito del USUARIO
        dispatch(addNewProductInShoppingCart(id, user.email));
        dispatch(addAmountForShoppingCartUser(price));
      } else {
        dispatch(addShoppingCart(game));
        setControl(listProductsShoppingCart.length);
        setSaveInLocalStorage(true);
      }

      setSuccessMsg(ADDED_TO_CART);
    } else {
      setSuccessMsg(ALREADY_IN_THE_CART);
    }
  };

  const addingToWishList = async () => {
    const newWishList = await addProductToWishList(user.email, id);
    dispatch(setwishList(newWishList));
  };

  return (
    <>
      <div className={changeClass.classCard}>
        <div className={styles.card}>
          {state ? (
            <Link to={`/${id}`}>
              <img src={background_image} alt={name} />
            </Link>
          ) : (
            <>
              <Link to={"/products"}>
                <img src={background_image} alt={name} />
              </Link>
            </>
          )}
          <div className={styles.containerTittleAndPrice}>
            <h3>{name}</h3>
            {discountApplied ? (
              <div>
                <del>{`${price}`}</del>
                <p>ON SALE: {`${discountPrice}`}</p>
              </div>
            ) : price === "free" ? (
              <p>{`${price}`}</p>
            ) : (
              <p>{`$${price}`}</p>
            )}
          </div>
          <div className={styles.addShoppingCart}>
            <div className={styles.containerButton}>
              {state ? (
                <>
                  <button
                    className={changeClass.classButton}
                    type="button"
                    onClick={addingToShoppingCart}
                  >
                    Add To Cart
                  </button>
                  <button
                    className={changeClass.classButton}
                    onClick={addingToWishList}
                  >
                    Add Favourite
                  </button>
                </>
              ) : (
                <p>Not avivable Game</p>
              )}
            </div>
            <p className={styles.msg}>{successMsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};
