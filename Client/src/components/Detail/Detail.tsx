import { NavBar } from "../NavBar/NavBar";
import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { Link, useParams } from "react-router-dom";
import { getProductByID } from "../../redux/actions/productAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { eraseItemById } from "../../redux/reducer/productReducer";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import styles from "./Detail.module.scss";
import { ADDED_TO_CART, ALREADY_IN_THE_CART } from "../../utils/constants";
//los import comentados de abajo no los toquen que son para implementar los botones a futuro
//import { getListGenres } from "../../redux/actions/genresAction";
//import { getListPlatforms } from "../../redux/actions/platformAction";

export const Detail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const game:any = useAppSelector((state) => state.productReducer.details)

  useEffect(() => {
    dispatch(getProductByID(parseInt(id)))
    return () => {
      dispatch(eraseItemById())
    }
  }, [])

  let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
  const [successMsg, setSuccessMsg] = useState("");

  const addingToShoppingCart = (e: any) => {
    const item = listProductsShoppingCart.find(item => item.id == parseInt(id));
    if(!item){
      dispatch(addShoppingCart(game));
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
											<h4>Generos</h4>
											<div className={styles['button-container']}>
												{game.genres.map((item: any, index: number) => (
													<button key={index}>{item}</button>
												))}
											</div>
										</div>
										{/* <div className={styles["platforms-section"]}>
                    <h4>Plataformas</h4>
                    <div className={styles["button-container"]}>
                      {
                        
                        game.platforms.slice(0, 3).map((item:any, index:number) => (
                          <button key={index}>{item}</button>
                        ))
                        
                      }
                  </div>
                  </div> */}
									</div>
								</div>
							</div>
						</section>
						<DetailCarousel images={game.images} />
					</div>
				)}
			</div>
		</>
	);
};
