import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { getListPlatforms } from "../../redux/actions/platformAction";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";

export const Products = () => {

  let searchedData = useAppSelector((state) => state.productReducer.searchedData);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListGenres());
    dispatch(getListPlatforms(''));
 
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
                <Card
                  id={item.id}
                  key={index}
                  name={item.name}
                  background_image={item.background_image}
                  platforms={item.platforms}
                  price={item.price}
                />
            </div>)
          })
          :
          <p>Cargando</p>
        }
      </div>
      
    </>
  );
};