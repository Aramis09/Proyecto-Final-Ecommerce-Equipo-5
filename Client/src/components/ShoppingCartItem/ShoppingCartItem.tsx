import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";

export const ShoppingCartItem = () => {

    let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
    let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);

    if (listProductsShoppingCart.length > 0) {
        return (
            <>
                <table>
                    <tbody>
                        {listProductsShoppingCart.map((item, index) => <tr key={index}><td>{item.name}</td><td>${item.price}</td></tr>)}
                        <tr><td>Amount Payable: </td><td>${totalAmount}</td></tr>
                    </tbody>
                </table>
                <button>
                    <Link to='/checkout'><p>CHECKOUT</p></Link>
                </button>
            </>
        );
    } else {
        return (
            <div>
                <p>Empty Shopping Car</p>
            </div>
        );
    };
};