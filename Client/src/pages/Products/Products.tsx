import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
//import { Product } from "../../components/Product/Product";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { getListPlatforms } from "../../redux/actions/platformAction";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";

export const Products = () => {

  let searchedData = useAppSelector((state) => state.productReducer.searchedData.slice(0, 6));
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getListGenres());
    dispatch(getListPlatforms(''));
  }, [])

  console.log('debug', searchedData)
  
  return (
    <>
      <NavBar />
      <div className={styles["page-container"]}>
        <Filters />
        {
          //<Product />
          searchedData.length
          ?
          searchedData.map((item: object, index: number) => {
            return (<div key={index}>
              <Card
                key={index}
                name={item.name}
                background_image={item.background_image}
                platforms={item.platforms}
                price={item.price}
              />
            </div>)
          })
          :
          <p>cargando</p>
        }
      </div>
      
    </>
  );
};