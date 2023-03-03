import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import styles from "./Products.module.css";

export const Products = () => {
  return (
    <>
      <NavBar />
      <div className={styles["page-container"]}>
        <Filters />
        <Product limit={60} />
      </div>
    </>
  );
};