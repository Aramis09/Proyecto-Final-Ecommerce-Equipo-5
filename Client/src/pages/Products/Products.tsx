import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect,useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import iconShoppingCart from "../../assets/carrito.png";
import { Link } from "react-router-dom";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

export const Products = () => {
  const [changeClass,setChangeClass] = useState(false);
  let searchedData = useAppSelector((state) => state.productReducer.searchedData);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListGenres());
 
    return () => {
      dispatch(eraseSearchedData())
    }
  }, [])
  
  return (
    <>
      {window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}

      <div className={styles["page-container"]}>
      <img className={styles.iconCarrito} src={iconShoppingCart} alt="soppingCart" onClick={()=> setChangeClass(!changeClass)}/>
      <Filters 
      flag = {changeClass}
      /> 
        {
          (searchedData.length && searchedData.length>0)
          ?
          searchedData.map((item: any, index: number) => {
            return (
            <div key={index} className={styles.productList}>
              {/* <Link to={`/${item.id}`}> */}
                <Card
                  id={item.id}
                  key={index}
                  name={item.name}
                  background_image={item.background_image}
                  price={item.price}
                  genres={item.genres}
                />
              {/* </Link> */}
              
            </div>)
          })
          :
          <p>Cargando</p>
        }
      </div>
      
    </>
  );
};