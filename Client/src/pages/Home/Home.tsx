import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getProductsByFilters } from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home = () => {

  const dispatch = useAppDispatch()
  
  const toTheSearchList = (e) => {
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
    <>
      <NavBar />
      <Carousel />
      <section className={styles["buttons-platforms"]}>
      <Link to={'/products'}>
        <button value='2' onClick={toTheSearchList}>PC</button>
      </Link>
      <Link to={'/products'}>
        <button value='4,6,15,16' onClick={toTheSearchList}>PLAYSTATION</button>
      </Link>
      <Link to={'/products'}>
        <button value='3,5,14,18' onClick={toTheSearchList}>XBOX</button>
      </Link>
      </section>
      <h2>TOP GAMES</h2>
      <Product/>
      <Link to={'/products'}>
        <button className={styles['More-products-btn']} value='0' onClick={toTheSearchList}>More</button>
      </Link>
    </>
  );
};