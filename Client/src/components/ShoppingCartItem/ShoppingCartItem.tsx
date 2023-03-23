import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getShoppingCartUserFromDB } from '../../redux/actions/shoppingCartAction';
import style from './ShoppingCartItem.module.scss';
import { saveShoppingCartLocalStorageInDB } from '../../redux/actions/localStorageAction';
import { useEffect } from 'react';


export const ShoppingCartItem = () => {

	const dispatch = useAppDispatch();
	const {user, isAuthenticated, loginWithRedirect}:any = useAuth0();
	const userShoppingCartEmpty = useAppSelector((state) => state.shoppingCartReducer.emptyUserDBShoppingCart)

    if(typeof user !== 'undefined'){
        var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartUser);
    } else {
        var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartGuest);
    }
	let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);

useEffect( ()=>{
    if(typeof user !== 'undefined'){
		//Si existe un carrito en el local storage, se procede a grabarlo en la BD
		saveShoppingCartLocalStorageInDB(user.email).then(
			()=> dispatch(getShoppingCartUserFromDB(user.email))
		)
		localStorage.removeItem('shoppingCart')
    }
  },[])

  totalAmount = Math.round(totalAmount * 100) / 100;

    if (listProductsShoppingCart.length > 0) {
        return (
					<>
						<table className={style.table}>
							<tbody className={style.tbody}>
								{listProductsShoppingCart.map((item:any, index) => (
									<tr key={index}>
										<td className={style.item}> {item.name}</td>
										<td className={style.item}> ${item.price}</td>
									</tr>
								))}
								<tr className={style.priceTotal}>

									<td>Amount Payable{` $${totalAmount}`}</td>

								</tr>
							</tbody>
						</table>
						{
							
						}
						<button className={style.checkout}>
							{
								isAuthenticated ? (
							<Link to='/checkout'>
								<p>CHECKOUT</p>
							</Link>
							): <p onClick={() => loginWithRedirect()}>Please LogIn</p>
							}
							
						</button>
					</>
				);
    } else {
        return (
            <div>
                <p className={style.cartClean}>Empty Shopping Car</p>
            </div>
        );
    };
};