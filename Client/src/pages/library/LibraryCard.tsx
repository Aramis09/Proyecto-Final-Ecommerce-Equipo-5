
import styles from "./LibraryCard.module.scss";
import { productLibrary } from "./LibraryInterfaces";
import {LIST_PRODUCTS_FRONT} from '../../utils/constants'
import {Link} from 'react-router-dom'

const CardLibrary = (productData:productLibrary) => {
    const { 
        id,
        name,
        background_image,
        price,
        released
    } = productData;
    return (
        <div className={styles.container}>
            <Link to={`/${id}`}>Link to the game</Link>
            <img src={background_image} alt="game" />
            <p>${price}</p>
            <p>{name}</p>
            <p>{released}</p>
        </div>
    );
};
export default CardLibrary;