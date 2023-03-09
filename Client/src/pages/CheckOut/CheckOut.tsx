import { NavBar } from "../../components/NavBar/NavBar";
//import { allGames } from "../../get";
import styles from "./CheckOut.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteItemShoppingCart } from "../../redux/actions/shoppingCartAction";


export const CheckOut = () => {
  //const gameSlice = allGames.slice(0, 3);
  let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
  let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);

  const dispatch = useAppDispatch();
  const deleteItem = (e: any) => {
    console.log("El id a enviar es: " + e.target.value);
    dispatch(deleteItemShoppingCart(e.target.value));
  }

  if(listProductsShoppingCart.length > 0){
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
                {listProductsShoppingCart.map((game) => (
                  <div className={styles["card-item"]}>
                    <img src={game.background_image} />
                    <h5>{game.name}</h5>
                    <p>$ {game.price}</p>
                    <button value={game.id} onClick={deleteItem}>x</button>
                  </div>
                ))}
                <p>MONTO A PAGAR: $/{totalAmount}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};
