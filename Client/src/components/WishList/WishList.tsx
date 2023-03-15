import { Link } from 'react-router-dom';
import style from './WishList.module.css';

export const WishList = () => {
    return (
        <div>
            <Link to='/'>
                <button className={style.wishListButton}>
                    MY WISH LIST
                </button>
            </Link>
        </div>
    );
};