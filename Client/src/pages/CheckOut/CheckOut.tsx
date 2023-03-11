import { NavBar } from "../../components/NavBar/NavBar";
//import { allGames } from "../../get";
import styles from "./CheckOut.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteItemShoppingCart } from "../../redux/actions/shoppingCartAction";
import { useAuth0 } from '@auth0/auth0-react';
import style from "../../components/NavBar/NavBar.module.scss";


export const CheckOut = () => {
  //const gameSlice = allGames.slice(0, 3);
  let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
  let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);

  const dispatch = useAppDispatch();
  const deleteItem = (e: any) => {
    console.log("El id a enviar es: " + e.target.value);
    dispatch(deleteItemShoppingCart(e.target.value));
  }

  const {user, isAuthenticated, loginWithPopup, logout} = useAuth0()

  if(listProductsShoppingCart.length > 0){
    return (
			<>
				<NavBar />
				<section className={styles['checkout-container']}>
					<div className={styles['form-container']}>
						<h4>Billing Information</h4>
						<form className={styles.form}>
							<div className={styles.dataContainer}>
								<input type='text' placeholder='Name' />
								<input type='text' placeholder='Last Name' />
								<input type='email' placeholder='Email' />
								<input type='text' placeholder='Phone Number' />
							</div>
						</form>
						{user?.email_verified ? (
							<button className={style.loginButton}>Pay</button>
						) : isAuthenticated ? (
							<button
								className={style.loginButton}
								onClick={() =>
									logout({ logoutParams: { returnTo: window.location.origin } })
								}>
								LOG OUT
							</button>
						) : (
							<button
								className={style.loginButton}
								onClick={() => loginWithPopup()}>
								Sign Up
							</button>
						)}
					</div>
					<div>
						<div className={styles['items-container']}>
							<h4>Products</h4>
							<div className={styles['card-container']}>
								{listProductsShoppingCart.map((game, index) => (
									<div key={index} className={styles['card-item']}>
										<img src={game.background_image} />
										<h5>{game.name}</h5>
										<p>$ {game.price}</p>
										<button value={game.id} onClick={deleteItem}>
											x
										</button>
									</div>
								))}
								<p className={styles.price}>Amount Payable: $/{totalAmount}</p>
							</div>
						</div>
					</div>
				</section>
			</>
		);
  }
};
