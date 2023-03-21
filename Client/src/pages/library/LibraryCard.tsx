import styles from "./LibraryCard.module.scss";
import { productLibrary } from "./LibraryInterfaces";

const CardLibrary = (productData:productLibrary) => {
    const { 
        name,
        background_image,
        price,
        released
    } = productData;
    return (
        <div className={styles.container}>
            <img src={background_image} alt="game" />
            <p>{name}</p>
            <p>${price}</p>
            <p>{released}</p>
        </div>
    );
};

export default CardLibrary;