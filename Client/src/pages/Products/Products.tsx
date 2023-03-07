import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { getListPlatforms } from "../../redux/actions/platformAction";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";

export const Products = () => {

  let searchedData = useAppSelector((state) => state.productReducer.searchedData);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListGenres());
    dispatch(getListPlatforms(''));
  }, [])
  
  return (
    <>
      <NavBar />
      <Filters />
      <div className={styles["page-container"]}>
        {
          (searchedData.length && searchedData.length>0)
          ?
          searchedData.map((item: any, index: number) => {
            return (
            <div key={index} className={styles.productList}>
              <Link to={`/${item.id}`}>
                <Card
                  key={index}
                  name={item.name}
                  background_image={item.background_image}
                  platforms={item.platforms}
                  price={item.price}
                />
              </Link>
              
            </div>)
          })
          :
          <p>cargando...</p>
        }
      </div>
      
    </>
  );
};