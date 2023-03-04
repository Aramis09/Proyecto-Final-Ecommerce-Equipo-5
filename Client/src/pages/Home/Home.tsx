import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { Link } from "react-router-dom";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import styles from "./Home.module.scss";

export const Home = () => {

  const dispatch = useAppDispatch()

  const eraseSearch = () => {
    dispatch(eraseSearchedData())
  }

  return (
    <>
      <NavBar />
      <Carousel />
      <section className={styles["buttons-platforms"]}>
        <button>PC</button>
        <button>PLAYSTATION</button>
        <button>XBOX</button>
      </section>
      <h2>TOP GAMES</h2>
      <Product/>
      <Link to={'/products'}>
      <button className={styles['More-products-btn']} onClick={eraseSearch}>More</button>
      </Link>
    </>
  );
};