import { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';
//import { Link } from "react-router-dom";
//import { useAuth0 } from "@auth0/auth0-react";
import { ShoppingCartModal } from '../ShoppingCartModal/ShoppingCartModal';


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
				onClick={(ev) => handleOpenModal(ev)}>
				<img className={style.cartIcon} src={cart} alt='cart_icon' />
			</button>
			{modalOpen && (
				<div>
					<ShoppingCartModal />
					<button
						className={style.closeModalButton}
						onClick={(ev) => handleCloseModal(ev)}>
						X
					</button>
				</div>
			)}
		</div>
	);
};