import { DashboardNav } from "../Nav/DashboardNav";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getAllProducts } from "../../../redux/actions/productAction";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
  let listProducts = useAppSelector(
    (state) => state.productReducer.allProductsData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <DashboardNav />
      <section className={styles["product-container"]}>
        <h3>Products</h3>
        <div className={styles["product-info"]}>
          <p>id</p>
          <p>name</p>
          <p>rating</p>
          <p>price</p>
        </div>
        {listProducts.map(({name, rating, id, price}, index) => (
          <div className={styles["product-item"]} key={index}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{rating}</p>
            <p>{price}</p>
          </div>
        ))}
      </section>
    </>
  );
};
