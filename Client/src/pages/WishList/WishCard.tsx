import { wishCard } from "./interfaces/wishProduct";
import styles from "./WishCard.module.scss";
import icon_cross  from "./images/cross.svg";

import { setwishList } from "../../redux/reducer/wishReducer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { removeProductToWishList } from "../../Controller/wishCard.";
const WishCard = (props:wishCard) => { //se cargaron la interfaz de esteban
const {id,email, name,background_image,price ,released} = props;
const dispatch = useAppDispatch();

    const deleteProductOfWishList = async () => {
        const newWishList = await removeProductToWishList(email,id);
        dispatch(setwishList(newWishList));
    };
    
    return (
        <div className={styles.conatiner}>
            <img src={background_image} alt="image_game" />
            <div className={styles.data}>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>${price}</p>
                <p className={styles.released}>{released}</p>
            </div>
            <img src={icon_cross} alt="" className={styles.iconCross} onClick={()=>deleteProductOfWishList()}/>
        </div>
    );
};

export default WishCard;