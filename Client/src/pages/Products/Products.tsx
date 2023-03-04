import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
//import { Product } from "../../components/Product/Product";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";

export const Products = () => {

  let searchedData = useAppSelector((state) => state.productReducer.searchedData.slice(0, 6));

  console.log(searchedData)


  
  return (
    <>
      <NavBar />
      <div className={styles["page-container"]}>
        <Filters />
        {
          //<Product />
          searchedData.length>0
          &&
          searchedData.map((item: object, index: number) => {
            <div key={index}>
              <Card
                key={index}
                name={item.name}
                background_image={item.background_image}
                platforms={item.platforms}
                price={item.price}
              />
            </div>
          })
        }
      </div>
    </>
  );
};