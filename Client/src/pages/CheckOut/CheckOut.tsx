

import { NavBar } from "../../components/NavBar/NavBar";
//import { allGames } from "../../get";
import styles from "./CheckOut.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteItemShoppingCart } from "../../redux/actions/shoppingCartAction";
import axios from "axios";
import { MERCADO_PAGO_LINK } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";



export const CheckOut = () => {
  //const gameSlice = allGames.slice(0, 3);
  let listProductsShoppingCart: object[] = useAppSelector((state) => state.shoppingCartReducer.listProductsShoppingCart);
  let totalAmount: number = useAppSelector((state) => state.shoppingCartReducer.totalAmount);
  console.log('CJECKOUT CARRITO', listProductsShoppingCart)
  let items = listProductsShoppingCart
  let {user}: any = useAuth0();
  

  const dispatch = useAppDispatch();
  const deleteItem = (e: any) => {
    console.log("El id a enviar es: " + e.target.value);
    dispatch(deleteItemShoppingCart(e.target.value));
  }

  const fetchCheckout = async () => {
    //console.log('items?', listProductsShoppingCart)
    let client = {
      name: user.name,
      email: user.email
    }
    // data.global is the ID that MP returns from the API, it comes from our backend route
    let redirectLink:any = (await axios.post(MERCADO_PAGO_LINK, {items, client})).data.response
    //console.log('red', await redirectLink)
    if(await redirectLink.id) {
        const script = document.createElement('script') // Here we create the empty script tag
        script.type = 'text/javascript' // The type of the script
        script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted //script.src = 'https://sdk.mercadopago.com/js/v2'
        script.setAttribute('data-preference-id', await redirectLink.id) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script) // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        
        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        const mp = new window.MercadoPago('TEST-5bbaf9c6-7285-45e4-966a-83819d381b76', {
            locale: 'es-AR'
        })
        
        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
            preference: {
            id: await redirectLink.id
            },
            render: {
            container: '.cho-container',
            label: 'Pagar',
            }
        });
    };
  };

  
  
  if(listProductsShoppingCart.length > 0){
    return (
      <>
        <NavBar />
        <section className={styles["checkout-container"]}>
          <div className={styles["form-container"]}>
            <h4>Datos de Facturación</h4>
            <form className={styles.form}>
              <div className={styles.dataContainer}>
                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Apellido" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Celular" />
              </div>
            </form>
            <button className={styles['form-button']} onClick={fetchCheckout}>generar link de pago</button>
            <p className="cho-container" ></p>
          </div>
          <div>
            <div className={styles["items-container"]}>
              <h4>Productos</h4>
              <div className={styles["card-container"]}>
                {listProductsShoppingCart.map((game: any, index) => (
                  <div className={styles["card-item"]}>
                    <img src={game.background_image} />
                    <h5>{game.name}</h5>
                    <p>$ {game.price}</p>
                    <button value={game.id} onClick={deleteItem}>x</button>
                  </div>
                ))}
                <p className={styles.price}>MONTO A PAGAR: $/{totalAmount}</p>
              </div>
            </div>
          </div>
        </section>
      </>
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