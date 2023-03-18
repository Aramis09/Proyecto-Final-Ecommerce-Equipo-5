import { wishCard } from "./interfaces/wishProduct";
import styles from "./WishCard.module.scss";
import icon_cross  from "./images/cerrar.png";
const WishCard = (props:wishCard) => { //se cargaron la interfaz de esteban
const {name,background_image,price ,released} = props;
    return (
        <div className={styles.conatiner}>
            <img src={background_image} alt="" />
            <div className={styles.data}>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>${price}</p>
                <p className={styles.released}>{released}</p>
                <img src={icon_cross} alt="" className={styles.iconCross} />
            </div>
        </div>
    );
};

export default WishCard;