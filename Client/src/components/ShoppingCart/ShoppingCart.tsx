import React, { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';

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
                        onClick={ev => handleCloseModal(ev)}>X</button>
                    <p>PRODUCTOS</p>
                    <p>PRECIO</p>
                    <p>TOTAL</p>
                </div>
            </div>
            }
        </div>
    );
};