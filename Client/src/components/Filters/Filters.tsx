import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import { selectedFilterGenre, selectedFilterPlatform, selectedAlphabeticOrder } from "../../redux/reducer/productReducer";
import { getProductsByFilters } from "../../redux/actions/productAction";
import styles from "./Filters.module.scss";

const optionOrder = ["ASC", "DESC"]; //"ASC" "DESC"

export const Filters = () => {

  const dispatch = useAppDispatch();
  const [genresOpen, setGenresOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  let listPlatforms = useAppSelector((state) => state.platformReducer.all)
  let listGenres = useAppSelector((state => state.genresReducer.all))
  let searchedName = useAppSelector((state) => state.productReducer.searchedName)
  let selectedFilterGenreData = useAppSelector((state) => state.productReducer.selectedFilterGenreData)
  let selectedFilterPlatformData = useAppSelector((state) => state.productReducer.selectedFilterPlatformData)
  let selectedFilterPriceRangeData = useAppSelector((state) => state.productReducer.selectedFilterPriceRangeData)
  let selectedAlphabeticOrderData = useAppSelector((state) => state.productReducer.selectedAlphabeticOrderData)

  const selectGenre = (dato: any) => {
    dispatch(selectedFilterGenre(parseInt(dato.target.value)))
  }

  const selectPlatform = (dato: any) => {
    dispatch(selectedFilterPlatform(parseInt(dato.target.value)))
  }

  const selectAlphabeticOrder = (dato:any) => {
    dispatch(selectedAlphabeticOrder(dato.target.value))
  }

  const filterTheSearch = () => {
    dispatch(getProductsByFilters( //NO TOCAR
			{ 
			name:searchedName,
			filters:
				{
				genres: selectedFilterGenreData,
				platform: selectedFilterPlatformData,
				priceRange: selectedFilterPriceRangeData
				},
			order:
			{
				alphabetic: selectedAlphabeticOrderData,
				price:''
			}    
			}
			));
  }
  
  //console.log('plat', listPlatforms, 'gen', listGenres)
  //console.log()

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
          {listGenres.map((item: any, index: number) => (
            <option key={index} value={item.id} onClick={selectGenre}>
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
            <option key={index} value={index} onClick={selectPlatform}>
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
            <option key={option} value={option} onClick={selectAlphabeticOrder}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={filterTheSearch}>filter</button>
      </div>
    </aside>
  );
};