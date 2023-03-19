import { CardProps } from "../../types";
import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addNewProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

import { style } from "@mui/system";
import { addProductToWishList } from "../../Controller/cardController";
import { setwishList } from "../../redux/reducer/wishReducer";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres
}: any) => {
  const { user }: any = useAuth0();
  //const platformsSlice = platforms.slice(0, 3);
  const dispatch = useAppDispatch();
  const [discountPrice,setDiscountPrice] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false)
  var todaysDiscount = useAppSelector((state) => state.productReducer.todaysDiscount)


  useEffect(()  => {
    if(parseFloat(price) !== 0 && todaysDiscount.discount !== 'No_Discount' && genres.includes(todaysDiscount.genre) && parseFloat(price) !==discountPrice && !discountApplied){
      let finalPrice = (parseFloat(price)*(1-todaysDiscount.discount));
      finalPrice = finalPrice.toFixed(2);
      setDiscountApplied(prev => prev = true)
      setDiscountPrice(finalPrice);
    }
  }, [price])


  if (user) {//si existe un Usuario agarra el Carrito de Usuario
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
      genres
    };
    const item = listProductsShoppingCart.find(
      (item: any) => item.id == parseInt(id)
    );

    if (!item) {//Si no esta el Producto en el carrito y
      if (user) {//si existe un usuario lo agrega al Carrito del USUARIO
        dispatch(addNewProductInShoppingCart(id, user.email));
        dispatch(addAmountForShoppingCartUser(price));
      } else {
        dispatch(addShoppingCart(game));//si !user lo agregar al Carrito de INVITADO
      }

      setSuccessMsg(ADDED_TO_CART);
    } else {
      setSuccessMsg(ALREADY_IN_THE_CART);
    }
  };
  
  const addingToWishList = async () => {
    const newWishList = await addProductToWishList(user.email,id);
    dispatch(setwishList(newWishList));
  };

  return (
		<>
			<div className={styles['card-container']}>
				<div className={styles.card}>
					<Link to={`/${id}`}>
						<img src={background_image} alt={name} />
					</Link>
					<div className={styles.containerTittleAndPrice}>
						<h3>{name}</h3>
						{

              discountApplied?
              <div>
                <del>{`${price}`}</del>
                <p>ON SALE: {`${discountPrice}`}</p>
              </div>
              :
              price === 'free' ? <p>{`${price}`}</p> : <p>{`$${price}`}</p>
              
            }
					</div>
					<div className={styles.addShoppingCart}>
          <div className={styles.containerButton}>
           <button className={styles.buttonAdd}  type='button' onClick={addingToShoppingCart}>
							Add To Cart
						</button>
            <button className={styles.buttonAdd} onClick={addingToWishList}>Add Favourite</button>
          </div>
						<p className={styles.msg}>{successMsg}</p>
					</div>
				</div>
			</div>
		</>
	);
};
