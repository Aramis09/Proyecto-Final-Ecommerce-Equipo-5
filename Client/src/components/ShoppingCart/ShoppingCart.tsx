import { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export const ShoppingCart = () => {
    const {user}:any = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (ev: any) => {
        ev.preventDefault();
        setModalOpen(true);
    };

    const handleCloseModal = (ev: any) => {
        ev.preventDefault();
        setModalOpen(false);
    };

    if(typeof user !== 'undefined'){
        var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartUser);
    } else {
        var listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCartGuest);
    }
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
    
                        <table>
                            <tbody>
                                {listProductsShoppingCart.map((item: any, index) => <tr key={index}><td>{item.name} </td><td> ${item.price}</td></tr>)}
                                <br />
                                <tr><td>MONTO A PAGAR: </td><td>${totalAmount}</td></tr>
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
    
                        <p className={style.cartClean}>CARRITO VACIO</p>
                    </div>
                </div>
                }
            </div>
        );
    }

};