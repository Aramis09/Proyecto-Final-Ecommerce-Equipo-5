
import react,{useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
import { getAllProductInWishList } from "../../redux/actions/wishActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import styles from "./WishList.module.scss"; 

import WishCard from "./WishCard";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

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
                {window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
            {
                wishListStore.length? 
                <section className={styles.container}>
                    <p className={styles.top}>WhisList</p>
                    <div className={styles.tittles}>
                        <p className={styles.tittle}>Name</p>
                        <p className={styles.tittle}>Price</p>
                        <p className={styles.tittle}>Released</p>
                    </div>
                    <br />
                    <section className={styles.containerCardsList}>
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
                </section>
                :<p>Not found Products</p>
            }
        </>
    );
};
export default WishList;