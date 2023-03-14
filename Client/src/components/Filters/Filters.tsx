import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import { selectedFilterGenre, selectedFilterPlatform, selectedAlphabeticOrder } from "../../redux/reducer/productReducer";
import { getProductsByFilters } from "../../redux/actions/productAction";
import { eraseSearchedName } from "../../redux/reducer/productReducer";
import styles from "./Filters.module.scss";
import { style } from "@mui/system";

const optionOrder = ["ASC", "DESC"];

export const Filters = () => {

  const dispatch = useAppDispatch();
  const [genresOpen, setGenresOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectAttribute, setSelectAttribute] = useState(true);
  let listPlatforms = useAppSelector((state) => state.platformReducer.listPlatformsData)
  let listGenres = useAppSelector((state => state.genresReducer.listGenresData))
  let searchedName = useAppSelector((state) => state.productReducer.searchedName)
  let selectedFilterGenreData = useAppSelector((state) => state.productReducer.selectedFilterGenreData)
  let selectedFilterPlatformData = useAppSelector((state) => state.productReducer.selectedFilterPlatformData)
  let selectedFilterPriceRangeData = useAppSelector((state) => state.productReducer.selectedFilterPriceRangeData)
  let selectedAlphabeticOrderData = useAppSelector((state) => state.productReducer.selectedAlphabeticOrderData)
  //console.log(selectAttribute)
  useEffect(() => {
    function handleResize() {
      setSelectAttribute(window.innerWidth > 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const selectGenre = (dato: any) => {
    dispatch(selectedFilterGenre(parseInt(dato.target.value)))
  }

  const selectPlatform = (dato: any) => {
    dispatch(selectedFilterPlatform([parseInt(dato.target.value)]))
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

  useEffect(() => {
    return () => {
      dispatch(eraseSearchedName())
    }
  })
  
  
	return (
		<div className={styles.container}>
			<aside className={styles['filters-container']}>
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if (platformsOpen || orderOpen) {
								setPlatformsOpen(false);
								setOrderOpen(false);
								setGenresOpen(!genresOpen);
							} else {
								setGenresOpen(!genresOpen);
							}
						}}>
						<p>Generos</p>
					</label>
					<select
						multiple={selectAttribute}
						className={genresOpen ? styles.open : ''}>
						{listGenres.map((item: any, index: number) => (
							<option key={index} value={item.id} onClick={selectGenre}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if (genresOpen || orderOpen) {
								setOrderOpen(false);
								setGenresOpen(false);
								setPlatformsOpen(!platformsOpen);
							} else {
								setPlatformsOpen(!platformsOpen);
							}
						}}>
						<p>Plataforma</p>
					</label>
					<select
						multiple={selectAttribute}
						className={platformsOpen ? styles.open : ''}>
						{listPlatforms.map((item: any, index: number) => (
							<option key={index} value={index} onClick={selectPlatform}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles['options-container']}>
					<label className={styles['label-tittle']}>Precio</label>
					<PriceSlider />
				</div>
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if (platformsOpen || genresOpen) {
								setPlatformsOpen(false);
								setGenresOpen(false);
								setOrderOpen(!orderOpen);
							} else {
								setOrderOpen(!orderOpen);
							}
						}}>
						<p>Orden</p>
					</label>
					<select
						multiple={selectAttribute}
						className={orderOpen ? styles.open : ''}>
						{optionOrder.map((option) => (
							<option
								key={option}
								value={option}
								onClick={selectAlphabeticOrder}>
								{option}
							</option>
						))}
					</select>
				</div>
				<button className={styles.buttonFilter} onClick={filterTheSearch}>
					<p>Filter</p>
				</button>
			</aside>
		</div>
	);
};