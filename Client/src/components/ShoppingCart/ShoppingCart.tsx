import { useState } from 'react';
import cart from '../../assets/carrito.png';
import style from './ShoppingCart.module.css';
import { ShoppingCartModal } from '../ShoppingCartModal/ShoppingCartModal';
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { getShoppingCartUserFromDB } from '../../redux/actions/shoppingCartAction';


export const ShoppingCart = () => {
    const dispatch = useAppDispatch();
    const {user}:any = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const userShoppingCartEmpty = useAppSelector((state) => state.shoppingCartReducer.emptyUserDBShoppingCart)

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

    if(typeof user !== 'undefined'){
        if (totalAmount === 0 && listProductsShoppingCart.length === 0){
            if(!userShoppingCartEmpty){
                dispatch(getShoppingCartUserFromDB(user.email))
            }
        }
    }

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