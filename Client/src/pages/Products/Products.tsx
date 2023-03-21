import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";

export const Products = () => {

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
      <NavBar />
      {/* <Filters /> */}
      <div className={styles["page-container"]}>
        <Filters />
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