
import style from './ShoppingCartModal.module.scss';

import { ShoppingCartItem } from '../ShoppingCartItem/ShoppingCartItem';


export const ShoppingCartModal = () => {

    return (
        <>
            <div className={style.modalContainer}>
                <div className={style.modalContent}>
                    <ShoppingCartItem />
                </div>
            </div>
        </>
    );
};