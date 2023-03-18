import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./CheckOut.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteItemShoppingCart } from "../../redux/actions/shoppingCartAction";
import { removeProductoInShoppingCar } from "../../redux/actions/shoppingCartAction";
import { restAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { MERCADO_PAGO_LINK } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import style from "../../components/NavBar/NavBar.module.scss";
import { useState } from "react";

export const CheckOut = () => {
  //const gameSlice = allGames.slice(0, 3);
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, loginWithPopup, logout }: any = useAuth0();
  if (typeof user !== 'undefined') {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartUser,
    );
  } else {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartGuest,
    );
  }
  let totalAmount: number = useAppSelector(
    (state) => state.shoppingCartReducer.totalAmount,
  );
  totalAmount = Math.round(totalAmount * 100) / 100;
  let items: any = listProductsShoppingCart;
  console.log('checkout items', items);

  const deleteItem = (e: any) => {
    console.log('El id a enviar es: ' + e.target.value);
    let lessPrice = items.filter(
      (i: any) => i.id === parseInt(e.target.value),
    )[0].price;
    if (typeof user !== 'undefined') {
      dispatch(removeProductoInShoppingCar(e.target.value, user.email));
      dispatch(restAmountForShoppingCartUser(lessPrice));
    }
    dispatch(deleteItemShoppingCart(e.target.value));
  };

  var discount = useAppSelector((state) => state.productReducer.todaysDiscount)
  console.log("today's d", discount)
  console.log(items)

  const fetchCheckout = async () => {
    //console.log('items?', listProductsShoppingCart)
    let client = {
      name: user.name,
      email: user.email,
    };

    // data.global is the ID that MP returns from the API, it comes from our backend route
    let redirectLink: any = (
      await axios.post(MERCADO_PAGO_LINK, { items, client , discount})
    ).data.response;
    //console.log('red', await redirectLink)
    if (await redirectLink.id) {
      const script = document.createElement('script'); // Here we create the empty script tag
      script.type = 'text/javascript'; // The type of the script
      script.src = 'https://sdk.mercadopago.com/js/v2'; // The link where the script is hosted //script.src = 'https://sdk.mercadopago.com/js/v2'
      script.setAttribute('data-preference-id', await redirectLink.id); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
      document.body.appendChild(script); // Here we append it to the body of our page

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
      const mp = new window.MercadoPago(
        'APP_USR-ae00b250-26a9-4302-ae63-f7a219cd7767',
        {
          locale: 'es-AR',
        },
      );

      // The ".checkout" is the function that creates the connection between the button and the platform
      mp.checkout({
        preference: {
          id: await redirectLink.id,
        },
        render: {
          container: '.cho-container',
          label: 'Pay',
        },
      });
    }
  };

  const [butOpen, setButOpen] = useState(false);

  const handleButOpen = (ev: any) => {
    ev.preventDefault();
    setButOpen(true);
  };
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    alert('Email Modified');
  };

  if (listProductsShoppingCart.length > 0) {
    return (
      <>
        <NavBar />
        <section className={styles['checkout-container']}>
          <div className={styles['form-container']}>
            {user?.email_verified && isAuthenticated ? (
              <div className={styles.checked}>
                <h4 className={styles.title}>
                  ¿Do you want to make the purchase?
                </h4>
                <button
                  className={styles['form-button']}
                  onClick={fetchCheckout}>
                  Generate Payment Link
                </button>
                <p className='cho-container'></p>
                <h4 className={styles.title}>
                  ¿Do you want to use a new email for the purchase?
                </h4>
                <button
                  className={styles['form-button']}
                  onClick={(ev) => handleButOpen(ev)}>
                  Yes
                </button>
                {butOpen && (
                  <form className={styles.form}>
                    <div className={styles.dataContainer}>
                      <label htmlFor='email'>Email: </label>
                      <input type='email' name='email' placeholder='Email' />
                      <button type='submit' onClick={handleSubmit}>
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className={styles.noRegister}>
                <h4>Please register to be able to make a purchase.</h4>
                <button
                  className={styles.loginButton}
                  onClick={() => loginWithPopup()}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div>
            <div className={styles['items-container']}>
              <h4>Products</h4>
              <div className={styles['card-container']}>
                {listProductsShoppingCart.map((game: any, index) => (
                  <div key={index} className={styles['card-item']}>
                    <img src={game.background_image} />
                    <h5>{game.name}</h5>
                    <p>${game.price}</p>
                    <button value={game.id} onClick={deleteItem}>
                      x
                    </button>
                  </div>
                ))}
                <p className={styles.price}>Amount Payable: ${totalAmount}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div>
        {!listProductsShoppingCart.length ? <Navigate to='/' /> : <></>}
      </div>
    );
  }
};

/*
NOTAS:

_hacer dotenv para credencial PUBLIC de mercadopago.

_hacer que el boton de mercado pago se genere sin desincronizacion (a veces no aparece)
_hacer que el boton de mercado pago funcione bien, sin duplicaciones.

_en caso de pago aprobadom, llevar a componente de "aprovado", (en este componente se hara una copia de los productos
para guardar en db y se borrara los datos del carrito del store)
_en caso de pago "pendiente"?
_en caso de pago "rechazado", volver al carrito de compras.


_buscar como hacer para recibir las notificaciones del comprobante de compra.

_dejar la moneda en peso o dolar?
_agregar limitaciones de pago?
_





*/

/*
if (!user.email){
    
    return(
      <div>
        <NavBar />
        La cuenta ingresada no soporta pagos, porfavor deslogueate
      </div>
    )
  } else

*/
