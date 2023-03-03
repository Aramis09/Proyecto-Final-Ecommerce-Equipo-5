import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { allGames } from "../../get";
import styles from "./Products.module.scss";

export const Products = () => {

  return (
    <>
      <NavBar />
      <div className={styles["page-container"]}>
        <Filters />
        <Product limit={allGames.length} />
      </div>
    </>
  );
};