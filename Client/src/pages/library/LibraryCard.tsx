
import styles from "./LibraryCard.module.scss";
import { productLibrary } from "./LibraryInterfaces";

const CardLibrary = (productData: productLibrary) => {
    const {
        name,
        background_image,
        price,
        released
    } = productData;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src={background_image} alt="game" />
                <div className={styles.subContent}>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>{released}</p>
                </div>
            </div>
            <hr />
        </div>
    );
};
export default CardLibrary;