import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

export const Home = () => {

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
      <button className={styles['More-products-btn']}>More</button>
      </Link>
    </>
  );
};