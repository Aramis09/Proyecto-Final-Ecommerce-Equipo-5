import React, { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from 'react-router-dom';

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

									<table>
										<tbody>
											{listProductsShoppingCart.map((item, index) => (
												<tr key={index}>
													{/* <td><img src={item.background_image}></img></td> */}
													<td>{item.name}</td>
													<td>$/{item.price}</td>
												</tr>
											))}
											<br />
											<tr>
												<td>MONTO A PAGAR: </td>
												<td>$/{totalAmount}</td>
											</tr>
										</tbody>
									</table>

									<Link to={'/checkout'}>
										<button>CHECKOUT</button>
									</Link>
								</div>
							</div>
						)}
					</div>
				);
    }else{
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
                            onClick={ev => handleCloseModal(ev)}>X
                        </button>
    
                        <p>CARRITO VACIO</p>
                    </div>
                </div>
                }
            </div>
        );
    }

};