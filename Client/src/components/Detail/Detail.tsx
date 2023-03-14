import { NavBar } from "../NavBar/NavBar";
import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { Link, useParams } from "react-router-dom";
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
//los import comentados de abajo no los toquen que son para implementar los botones a futuro
//import { getListGenres } from "../../redux/actions/genresAction";
//import { getListPlatforms } from "../../redux/actions/platformAction";

export const Detail = () => {
  const {user}:any = useAuth0();
  const { id }:any = useParams();
  const dispatch = useAppDispatch();
  const game:any = useAppSelector((state) => state.productReducer.details)

  useEffect(() => {
    dispatch(getProductByID(parseInt(id)))
    return () => {
      dispatch(eraseItemById())
    }
  }, [])

  if(typeof user !== 'undefined'){
    var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartUser);
  } else {
    var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartGuest);
  }
  const [successMsg, setSuccessMsg] = useState("");

  const addingToShoppingCart = (e: any) => {
    const item:any = listProductsShoppingCart.find((item:any) => item.id == parseInt(id));
    //console.log('detail item', item)
    if(!item){

      if(typeof user !== 'undefined'){
        dispatch(addNewProductInShoppingCart(id, user.email));
        dispatch(addAmountForShoppingCartUser(item.price))
      } else {
        dispatch(addShoppingCart(game));
      }
      setSuccessMsg(ADDED_TO_CART);
    }else{
      setSuccessMsg(ALREADY_IN_THE_CART);
    }
    
  }

  return (
		<>
			<NavBar />
			<div>
				{game.name && (
					<div>
						<section className={styles['background-image']}>
							<img src={game.background_image} alt={game.name} />
						</section>
						<section className={styles['info-container']}>
							<div className={styles['left-section']}>
								<div key={game.id}>
									<h3>{game.name}</h3>
									<p>${game.price}</p>
									<Rating value={game.rating} />
									<button type='button' onClick={addingToShoppingCart}>
										Add To Cart
									</button>
									<p className={styles.msg}>{successMsg}</p>
								</div>
							</div>
							<div className={styles['right-section']}>
								<div>
									<p className={styles.description}>{game.description}</p>
									<div className={styles['right-section-info']}>
										<div className={styles['gender-section']}>
											<h4>Genres</h4>
											<div className={styles['button-container']}>
												{game.genres.map((item: any, index: number) => (
													<button key={index}>{item}</button>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
            <DetailCarousel images={game.images} />
            <br />
            <Comments/>
					</div>
				)}
			</div>
		</>
	);
};
