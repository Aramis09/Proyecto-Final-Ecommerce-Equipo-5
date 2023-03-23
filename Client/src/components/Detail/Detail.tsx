import { NavBar } from "../NavBar/NavBar";
import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { useParams } from "react-router-dom";
import { getProductByID } from "../../redux/actions/productAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { eraseItemById } from "../../redux/reducer/productReducer";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addNewProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import styles from "./Detail.module.scss";
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";
import { addAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { useAuth0 } from "@auth0/auth0-react";
import Comments from './Comments'
import { saveShoppingCartInLocalStorage } from "../../redux/actions/localStorageAction";
import { checkIfProductWasPurchased } from "../../Controller/cardController";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
//los import comentados de abajo no los toquen que son para implementar los botones a futuro
//import { getListGenres } from "../../redux/actions/genresAction";
//import { getListPlatforms } from "../../redux/actions/platformAction";

export const Detail = () => {
  const [changeClass,setChangeClass] = useState({classButton:styles.buttonAdd,classCard:styles.cardContainer});
  const {user}:any = useAuth0();
  const { id }:any = useParams();
  const dispatch = useAppDispatch();
  const game:any = useAppSelector((state) => state.productReducer.details)
  const [successMsg, setSuccessMsg] = useState("");
  const [control, setControl] = useState(-1);
  const [saveInLocalStorage, setSaveInLocalStorage] = useState(false);
  useEffect(() => {
    if(saveInLocalStorage === true){
      dispatch(saveShoppingCartInLocalStorage(listProductsShoppingCart, totalAmount));
    }
  },[control]);
  
  useEffect(() => {
    dispatch(getProductByID(parseInt(id)));
    if(user){
      checkIfProductWasPurchased(user.email,id)
      .then(check => check ? 
      setChangeClass({classButton:styles.buttonHide,classCard:styles.cardContainerBuy})
      :setChangeClass({classButton:styles.buttonAdd,classCard:styles.cardContainer}));
    };
    return () => {
      dispatch(eraseItemById())
    }
  }, [user])
  let totalAmount: number;

  if(typeof user !== 'undefined'){
    var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartUser);
  } else {
    var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartGuest);
    totalAmount = useAppSelector((state) => state.shoppingCartReducer.totalAmount);
  }
  
    const addingToShoppingCart = (e: any) => {
      const item:any = listProductsShoppingCart.find((item:any) => item.id == parseInt(id));
      if(!item){
  
        if(typeof user !== 'undefined'){
          dispatch(addNewProductInShoppingCart(id, user.email));
          dispatch(addAmountForShoppingCartUser(item.price))
        } else {
          dispatch(addShoppingCart(game));
          setControl(listProductsShoppingCart.length);
          setSaveInLocalStorage(true);
        }
        setSuccessMsg(ADDED_TO_CART);
      }else{
        setSuccessMsg(ALREADY_IN_THE_CART);
      }
      
    }







  return (
    <>
      {window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
      <div>
        {
          game.name &&
          <div>
            <section className={styles["background-image"]}>
              <img src={game.background_image} alt={game.name} />
            </section>      
            <section className={styles["info-container"]}>
              <div className={styles["left-section"]}>
                <div key={game.id}>
                  <h3>{game.name}</h3>
                  <p>${game.price}</p>
                  <Rating value={game.rating} size={24}/>
                  <button className={changeClass.classButton} type="button" onClick={addingToShoppingCart}>Add To Cart</button>
                  <p>{successMsg}</p>
                </div>
              </div>
              <div className={styles["right-section"]}>
              <div>
                <p className={styles.description}>{game.description}</p>
                <div className={styles["right-section-info"]} >
                  <div className={styles["gender-section"]}>
                    <h4>Generos</h4>
                    <div className={styles["button-container"]}>
                      {
                        
                        game.genres.map((item:any, index:number) => (
                          <button key={index}>{item}</button>
                        ))
                        
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
            <DetailCarousel images={game.images}/>
            <Comments/>
          </div>
        
        }

      </div>
    </>
  );
};
