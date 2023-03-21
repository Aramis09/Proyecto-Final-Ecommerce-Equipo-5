import { useState } from 'react';
import cart from '../../assets/carrito.png';
import shoppingCart from '../../assets/shopping-cart-discount.svg'
import style from './ShoppingCart.module.css';
//import { Link } from "react-router-dom";
//import { useAuth0 } from "@auth0/auth0-react";
import { ShoppingCartModal } from '../ShoppingCartModal/ShoppingCartModal';


export const ShoppingCart = () => {
    const [modalOpen, setModalOpen] = useState(false);
    

	return (
		<div>
			<button
				className={style.cartButton}
				onClick={(ev) =>  setModalOpen(!modalOpen)}>
				<img className={style.cartIcon} src={shoppingCart} alt='cart_icon' />
			</button>
			{modalOpen && (
				<div>
					<ShoppingCartModal />
				</div>
			)}
		</div>
	);
};