import { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";

export const ShoppingCart = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (ev: any) => {
        ev.preventDefault();
        setModalOpen(true);
    };

    const handleCloseModal = (ev: any) => {
        ev.preventDefault();
        setModalOpen(false);
    };

    let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
	let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);
	
    if(listProductsShoppingCart.length > 0){
        return (
            <div>
                <button
                    className={style.cartButton}
                    onClick={ev => handleOpenModal(ev)}>
                    <img
                        className={style.cartIcon}
                        src={cart}
                        alt="cart_icon" />
                </button>
                {modalOpen && <div className={style.modalContainer}>
                    <div className={style.modalContent}>
                        <button
                            className={style.closeModalButton}
                            onClick={ev => handleCloseModal(ev)}>x
                        </button>
    
                        <table className={style.table}>
                            <tbody>
                                {listProductsShoppingCart.map((item, index) => <tr key={index}><td>{item.name} </td><td> ${item.price}</td></tr>)}
                                <br />
                                <tr className={style.priceTotal}><td>Amount Payable: </td><td> ${totalAmount}</td></tr>
                            </tbody>
                        </table>
                        <button><Link to = '/checkout'><p>CHECKOUT</p></Link></button>
                    </div>
                </div>
                }
            </div>
        );
    }else{
        return (
					<div>
						<button
							className={style.cartButton}
							onClick={(ev) => handleOpenModal(ev)}>
							<img className={style.cartIcon} src={cart} alt='cart_icon' />
						</button>
						{modalOpen && (
							<div className={style.modalContainer}>
								<div className={style.modalContent}>
									<button
										className={style.closeModalButton}
										onClick={(ev) => handleCloseModal(ev)}>
										X
									</button>

									<p className={style.cartClean}>Empty Shopping Cart</p>
								</div>
							</div>
						)}
					</div>
				);
    }

};