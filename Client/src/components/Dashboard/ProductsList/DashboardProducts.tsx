import { DashboardNav } from "../Nav/DashboardNav";
import { PRUEBA } from "../../../prueba";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
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
        {PRUEBA.map(({ id, name, price, rating }) => (
          <div className={styles['product-item']} key={id}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{rating}</p>
            <p>${price}</p>
          </div>
        ))}
      </section>
    </>
  );
};
