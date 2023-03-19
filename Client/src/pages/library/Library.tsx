import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { getProductsOfLibrary } from "../../Controller/LibraryController";

import CardLibrary from "./LibraryCard";
import { productLibrary } from "./LibraryInterfaces";



const Library = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth0();
    useEffect(() => {
        if(user?.email){
            getProductsOfLibrary(String(user.email)).then((products:any) => setProducts(products));
        };
    },[])
    return(
        <div>
            <NavBar/>
            {
                products.length ? 
                <section>
                    {products.map((product:productLibrary) => {
                        return (
                            <CardLibrary
                            id={product.id}
                            name = {product.name} 
                            background_image = { product.background_image}
                            price = {product.price}
                            released = {product.released}
                            />
                        );
                    })}
                </section>
                : <p>"Not found Games "</p>
            }
        </div> 
    )
};

export default Library;