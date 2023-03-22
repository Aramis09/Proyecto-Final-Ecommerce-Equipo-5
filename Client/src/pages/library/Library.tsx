
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { getProductsOfLibrary } from "../../Controller/LibraryController";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import styles from "./Library.module.scss";
import LibraryCard from './LibraryCard';
import { productLibrary } from "./LibraryInterfaces";



const Library = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        if (user?.email) {
            getProductsOfLibrary(String(user.email)).then((products: any) => setProducts(products));
        };
    }, []);
    return (
        <div className={styles.fullContainer} >
            {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
            {
                products.length ?
                    <section>
                        {products.map((product: productLibrary) => {
                            return (
                                <LibraryCard
                                    id={product.id}
                                    name={product.name}
                                    background_image={product.background_image}
                                    price={product.price}
                                    released={product.released}
                                />
                            );
                        })}
                    </section>
                    : <p>"Not found Games "</p>
            }
        </div>
    );
};
export default Library;