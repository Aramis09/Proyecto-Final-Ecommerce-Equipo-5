import { useState } from "react";
import { PRUEBA } from "../../prueba";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import styles from "./Filters.module.scss";

//const uniqueGenres = [...new Set(PRUEBA.flatMap((option) => option.genres))];
const uniquePlatform = [
  ...new Set(PRUEBA.flatMap((option) => option.platforms)),
];
const optionOrder = ["a-z", "z-a"]; //"ASC" "DESC"
 const getPriceRange = () => {
   const priceRange = PRUEBA.map((item) => item.price).flat();
   const minPrice = Math.min(...priceRange.map(Number));
   const maxPrice = Math.max(...priceRange.map(Number));
   console.log(minPrice, maxPrice);
 };

export const Filters = () => {
  const [genresOpen, setGenresOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  let listPlatforms = useAppSelector((state) => state.platformReducer.all)
  let listGenres = useAppSelector((state => state.genresReducer.all))

  //console.log('filters', listPlatforms, listGenres)

  return (
    <aside className={styles["filters-container"]}>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (platformsOpen || orderOpen) {
              setPlatformsOpen(false);
              setOrderOpen(false);
              setGenresOpen(!genresOpen);
            } else {
              setGenresOpen(!genresOpen);
            }
          }}
        >
          Generos
        </label>
        <select multiple className={genresOpen ? styles.open : ""}>
          {listGenres.map((item: any, index:number) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (genresOpen || orderOpen) {
              setOrderOpen(false);
              setGenresOpen(false);
              setPlatformsOpen(!platformsOpen);
            } else {
              setPlatformsOpen(!platformsOpen);
            }
          }}
        >
          Plataforma
        </label>
        <select multiple className={platformsOpen ? styles.open : ""}>
          {listPlatforms.map((item: any, index: number) => (
            <option key={index} value={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["options-container"]}>
        <label className={styles["label-tittle"]}>Precio</label>
        <PriceSlider />
      </div>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (platformsOpen || genresOpen) {
              setPlatformsOpen(false);
              setGenresOpen(false);
              setOrderOpen(!orderOpen);
            } else {
              setOrderOpen(!orderOpen);
            }
          }}
        >
          Orden
        </label>
        <select multiple className={orderOpen ? styles.open : ""}>
          {optionOrder.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {
        
        /*
        
        */
      }
    </aside>
  );
};