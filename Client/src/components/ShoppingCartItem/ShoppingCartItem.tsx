import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import style from './ShoppingCartItem.module.css';


export const ShoppingCartItem = () => {

    let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
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