import { DashboardNav } from "../Nav/DashboardNav";
import { PRUEBA } from "../../../prueba";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { eraseSearchedData } from "../../../redux/reducer/productReducer";
import { getListGenres } from "../../../redux/actions/genresAction";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
  let searchedData = useAppSelector(
    (state) => state.productReducer.searchedData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListGenres());
    return () => {
      dispatch(eraseSearchedData());
    };
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
        {searchedData.length && searchedData.length > 0 ? (
          PRUEBA.map(({ id, name, price, rating }) => (
            <div className={styles["product-item"]} key={id}>
              <p>{id}</p>
              <p>{name}</p>
              <p>{rating}</p>
              <p>${price}</p>
            </div>
          ))
        ) : (
          <p>lloralo</p>
        )}
      </section>
    </>
  );
};
