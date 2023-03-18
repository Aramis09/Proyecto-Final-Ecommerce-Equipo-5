import react,{useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
import { getAllProductInWishList } from "../../redux/actions/wishActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import WishCard from "./WishCard";

const WishList = () => {
const dispatch = useAppDispatch();
const wishListStore = useAppSelector(state => state.wishReducer.wishList);
const { user } = useAuth0();

useEffect(() => {
    const email:string = String(user?.email);
    if(user?.email){
        dispatch(getAllProductInWishList(email));
    };
    
}, [user]);


    return (
        <>
            <NavBar/>
            {
                wishListStore.length? 
                <section>
                    {wishListStore.map((wishProduct:any) => {
                        return(
                            <WishCard
                            key = {Number(wishProduct.id)}
                            id = {Number(wishProduct.id)}
                            email = {String(user?.email)}
                            name = {wishProduct.name} 
                            background_image = { wishProduct.background_image}
                            price = {wishProduct.price}
                            released = {wishProduct.released}
                            />
                        )
                    })}
                </section>
                :<p>Not found Products</p>
            }
        </>
    );
};
export default WishList;