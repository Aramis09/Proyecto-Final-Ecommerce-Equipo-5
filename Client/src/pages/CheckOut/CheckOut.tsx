import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./CheckOut.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteItemShoppingCart } from "../../redux/actions/shoppingCartAction";
import { removeProductoInShoppingCar } from "../../redux/actions/shoppingCartAction";
import { restPriceForFinalAmountCheckout } from "../../redux/reducer/shoppingCartReducer";
import { MERCADO_PAGO_LINK } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import style from "../../components/NavBar/NavBar.module.scss";
import { useState, useEffect } from "react";
import { saveShoppingCartInLocalStorage } from "../../redux/actions/localStorageAction";
import {MakeGift} from '../../components/MakeGift/MakeGift'
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

export const CheckOut = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loginWithPopup, logout }: any = useAuth0();
  const [control, setControl] = useState(-1);
  const [saveInLocalStorage, setSaveInLocalStorage] = useState(false);
  const [friendMail, setFriendMail] = useState<string | null>('');
  const [init_pointButton, setInit_PointButton] = useState(false)
  const [loader, setLoader] = useState(false);

  const handleChildVariable = (friendMail: string | null) => {
    setFriendMail(friendMail);
    //console.log("friendMail",friendMail)
  };

  if (typeof user !== 'undefined') {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartUser,
    );
  } else {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartGuest,
    );
  }
  let totalAmount: number = useAppSelector(
    (state) => state.shoppingCartReducer.finalPriceForCheckout
  );
  totalAmount = Math.round(totalAmount * 100) / 100;
  //console.log('ttam', totalAmount)
  let items: any = listProductsShoppingCart;
  let todaysDiscount = useAppSelector((state) => state.productReducer.todaysDiscount)


  const deleteItem = (e: any) => {
    //console.log('El id a enviar es: ' + e.target.value);
    let itemData = items.filter((i: any) => i.id === parseInt(e.target.value))[0];
    let genresFromItem = itemData.Genres.map(item => item.name);
    let lessPrice;
    if(genresFromItem.includes(todaysDiscount.genre)){
      lessPrice =  (((100 - todaysDiscount.discount) * parseFloat(itemData.price)) / 100);
      lessPrice = parseFloat(lessPrice.toFixed(2))
    } else {
      lessPrice = parseFloat(itemData.price)
    }
    console.log(genresFromItem)

    if (typeof user !== 'undefined') {
      dispatch(removeProductoInShoppingCar(e.target.value, user.email));
      dispatch(restPriceForFinalAmountCheckout(lessPrice));
    }else{
      setControl(listProductsShoppingCart.length);
      setSaveInLocalStorage(true);
    }
    dispatch(deleteItemShoppingCart(e.target.value));
    setInit_PointButton(prev => prev = '')
  };

  useEffect(() => {
    if(saveInLocalStorage === true){
      dispatch(saveShoppingCartInLocalStorage(listProductsShoppingCart, totalAmount));
    }
  },[control]);

  var discount = useAppSelector((state) => state.productReducer.todaysDiscount)

  const fetchCheckout = async () => {
    setLoader(true)
    let client = {
      name: user.name,
      email: user.email,
    };
    if(friendMail){
      client.email = friendMail
    }
    let redirectLink: any = (
      await axios.post(MERCADO_PAGO_LINK, {items, client , discount})
    ).data.response;
    //console.log('red', await redirectLink)
    if (await redirectLink.init_point) {
      setLoader(false)
      setInit_PointButton(prev => prev = redirectLink.init_point)
    }
  };

 
  if (listProductsShoppingCart.length > 0) {
    return (
      <>
        {window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
        <section className={styles['checkout-container']}>
          <div className={styles['form-container']}>
            {user?.email_verified && isAuthenticated ? (
              <div className={styles.checked}>
                <h4 className={styles.title}>
                  ¿Do you want to make the purchase?
                </h4>
                <MakeGift onVariableChange={handleChildVariable}/>
                <button
                  className={styles['form-button']}
                  onClick={fetchCheckout}>
                  Generate Payment Link
                </button>
                <div>
                {
                  loader ?
                  <img src="https://media.tenor.com/je-huTL1vwgAAAAi/loading-buffering.gif"/>
                  :
                  <div>
                    {
                      init_pointButton &&
                    <a href={`${init_pointButton}`}><button>Pay</button></a>
                    }
                  </div>
                }
                </div>
              </div>
            ) : (
              <div className={styles.noRegister}>
                <h4>Please register to be able to make a purchase.</h4>
                <button
                  className={styles.loginButton}
                  onClick={() => loginWithPopup()}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div>
            <div className={styles['items-container']}>
              <h4>Products</h4>
              <div className={styles['card-container']}>
                {listProductsShoppingCart.map((game: any, index) => 
                    {
                      console.log(game)
                      var genres = game.Genres.map(item => item.name)
                      if(genres.includes(todaysDiscount.genre)){
                        return (
                          <div key={index} className={styles['card-item']}>
                            <img src={game.background_image} />
                            <h5>{game.name}</h5>
                            <p>{(((100 - todaysDiscount.discount) * parseFloat(game.price)) / 100).toFixed(2)}</p>
                            <button value={game.id} onClick={deleteItem}>
                              x
                            </button>
                          </div>
                        )
                      } else {
                        return (
                          <div key={index} className={styles['card-item']}>
                            <img src={game.background_image} />
                            <h5>{game.name}</h5>
                            <p>${game.price}</p>
                            <button value={game.id} onClick={deleteItem}>
                              x
                            </button>
                          </div>
                        )
                      }
                      
                    }
                )}
                <p className={styles.price}>Amount Payable: ${totalAmount}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div>
        {!listProductsShoppingCart.length ? <Navigate to='/' /> : <></>}
      </div>
    );
  }
};
