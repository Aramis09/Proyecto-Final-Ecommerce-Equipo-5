
import { productLibrary } from "./LibraryInterfaces";

const CardLibrary = (productData:productLibrary) => {
    const { 
        name,
        background_image,
        price,
        released} = productData;
    return (
        <div>
            <img src={background_image} alt="game" />
            <p>{name}</p>
            <p>${price}</p>
            <p>{released}</p>
        </div>
    );
};

export default CardLibrary;