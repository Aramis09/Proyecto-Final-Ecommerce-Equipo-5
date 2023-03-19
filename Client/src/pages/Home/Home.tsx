import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getProductsByFilters } from "../../redux/actions/productAction";
//import { getShoppingCartUserFromDB } from "../../redux/actions/shoppingCartAction";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
//import { useAuth0 } from "@auth0/auth0-react";


export const Home = () => {
  const dispatch = useAppDispatch();

  const toTheSearchList = (e: any) => {
    
    dispatch(getProductsByFilters({
      name:'',
			filters:
				{
				genres:[],
				platform: [],
				priceRange:[0,100]
				},
			order:
			{
				alphabetic:'',
				price:''
			}    
    }))
  }
  
  return (
    <div className={styles.container}>
      <NavBar />
      <Carousel />
      
      <Link to={'/friends'}>
        <button>Friends</button>
      </Link>

      <Link to = "/wish">wish</Link><br />
      <Link to = "/library">library</Link>

      <Link to={'/users'}>
      <button>Dashboard</button>
      </Link>
      <h2 className={styles.title}>TOP GAMES</h2>
      <Product/>
      <Link to={'/products'}>
        <button className={styles['More-products-btn']} value='0' onClick={toTheSearchList}>More</button>
      </Link>
    </div>
  );
};