import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar";
import { Product } from "../../components/Product/Product";
import styles from "./Home.module.css";

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
      <Product limit={6}/>
      <button className={styles['More-products-btn']}>More</button>
    </>
  );
};
