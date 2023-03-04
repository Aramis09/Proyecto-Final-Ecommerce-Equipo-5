import { NavBar } from "../../components/NavBar/NavBar";
import { allGames } from "../../get";
import styles from "./CheckOut.module.scss";

export const CheckOut = () => {
  const gameSlice = allGames.slice(0, 3);

  return (
    <>
      <NavBar />
      <section className={styles["checkout-container"]}>
        <div className={styles["form-container"]}>
          <h4>Datos de Compra</h4>
          <form className={styles.form}>
            <div className={styles.dataContainer}>
              <input type="text" placeholder="Nombre" />
              <input type="email" placeholder="Email" />
            </div>
            <div className={styles.dataContainer}>
              <input type="text" placeholder="Apellido" />
              <input type="text" placeholder="Celular" />
            </div>
          </form>
          <button className={styles['form-button']}>Pagar</button>
        </div>
        <div>
          <div className={styles["items-container"]}>
            <h4>Productos</h4>
            <div className={styles["card-container"]}>
              {gameSlice.map((game) => (
                <div className={styles["card-item"]}>
                  <img src={game.background_image} />
                  <h5>{game.name}</h5>
                  <p>$ {game.price}</p>
                  <button>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
