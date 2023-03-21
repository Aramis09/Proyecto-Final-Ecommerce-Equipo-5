import { Link } from 'react-router-dom';
import style from './WishListButton.module.css';

export const WishList = () => {
    return (
        <div>
            <Link to='/wishList'>
                <button className={style.wishListButton}>
                    MY WISH LIST
                </button>
            </Link>
        </div>
    );
};