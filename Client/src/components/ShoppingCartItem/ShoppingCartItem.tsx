import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import style from './ShoppingCartItem.module.css';
import { useAuth0 } from '@auth0/auth0-react';



export const ShoppingCartItem = () => {
    const { user }: any = useAuth0();

    if (typeof user !== 'undefined') {
			var listProductsShoppingCart: object[] = useAppSelector(
				(state) => state.shoppingCartReducer.listProductsShoppingCartUser,
			);
		} else {
			var listProductsShoppingCart: object[] = useAppSelector(
				(state) => state.shoppingCartReducer.listProductsShoppingCartGuest,
			);
		}
    let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);

    if (listProductsShoppingCart.length > 0) {
        return (
					<>
						<table className={style.table}>
							<tbody className={style.tbody}>
								{listProductsShoppingCart.map((item, index) => (
									<tr key={index}>
										<td className={style.item}> {item.name}</td>
										<td className={style.item}> ${item.price}</td>
									</tr>
								))}
								<tr className={style.priceTotal}>
									<td>Amount Payable: ${totalAmount}</td>
								</tr>
							</tbody>
						</table>
						<button>
							<Link to='/checkout'>
								<p>CHECKOUT</p>
							</Link>
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