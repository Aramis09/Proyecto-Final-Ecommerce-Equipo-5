import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getProductsByFilters } from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home = () => {

  const dispatch = useAppDispatch()
  
  const toTheSearchList = (e:any) => {
    let num;
    let data = e.target.value;
    if(data.length>1){
    data = data.split(',')
    num = data.map(item => parseInt(item))
    } else if (data === '0'){
      num = []
    } else {
      num = [parseInt(data)]
    }
    
    dispatch(getProductsByFilters({
      name:'',
			filters:
				{
				genres:[],
				platform: num,
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
      <h2 className={styles.title}>TOP GAMES</h2>
      <Product/>
      <Link to={'/products'}>
        <button className={styles['More-products-btn']} value='0' onClick={toTheSearchList}>More</button>
      </Link>
    </div>
  );
};