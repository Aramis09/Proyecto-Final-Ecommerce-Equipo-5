import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import { selectedFilterGenre, selectedAlphabeticOrder, eraseSearchedName, selectedPriceOrder } from "../../redux/reducer/productReducer";
import { getProductsByFilters } from "../../redux/actions/productAction";
import styles from "./Filters.module.scss";

const optionOrder = ["ASC", "DESC"];

export const Filters = (flags:any) => {

  const dispatch = useAppDispatch();
  const [genresOpen, setGenresOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderPriceOpen, setOrderPriceOpen] = useState(false);
  const [changeClass,setChangeClass] = useState({classContainer:styles.containerHide}); 
  const [selectAttribute, setSelectAttribute] = useState(true);
  let listGenres = useAppSelector((state => state.genresReducer.listGenresData))
  let searchedName = useAppSelector((state) => state.productReducer.searchedName)
  let selectedFilterGenreData = useAppSelector((state) => state.productReducer.selectedFilterGenreData)
  let selectedFilterPriceRangeData = useAppSelector((state) => state.productReducer.selectedFilterPriceRangeData)
  let selectedAlphabeticOrderData = useAppSelector((state) => state.productReducer.selectedAlphabeticOrderData)
	let selectedPriceOrderData = useAppSelector((state) => state.productReducer.selectedPriceOrderData)

	//console.log()("soy el filter","filter")

  useEffect(() => {
    function handleResize() {
      setSelectAttribute(window.innerWidth > 767);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
	  flags.flag ? setChangeClass({classContainer:styles.containerShow}):setChangeClass({classContainer:styles.containerHide})
  },[flags]);
  const selectGenre = (dato: any) => {
    dispatch(selectedFilterGenre(parseInt(dato.target.value)))
  }

  useEffect(() => {
	filterTheSearch()
  },[flags.pageNumber]);


  const selectAlphabeticOrder = (dato:any) => {
    dispatch(selectedAlphabeticOrder(dato.target.value))
  }
	const selectPriceOrder = (dato:any) => {
    dispatch(selectedPriceOrder(dato.target.value))
  }

  const filterTheSearch = () => {
    dispatch(getProductsByFilters( //NO TOCAR
			{ 
			name:searchedName,
			filters:
				{
				genres: selectedFilterGenreData,
				platform: [],
				priceRange: selectedFilterPriceRangeData
				},
			order:
			{
				alphabetic: selectedAlphabeticOrderData,
				price: selectedPriceOrderData
			}    
			},flags.pageNumber
			));
  }

  useEffect(() => {
    return () => {
      dispatch(eraseSearchedName())
    }
  },[])
  
  
	return (
		<div className={changeClass.classContainer}>
			<aside className={styles['filters-container']}>
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if ( orderOpen || orderPriceOpen ) {
								setOrderOpen(false);
								setOrderPriceOpen(false)
								setGenresOpen(!genresOpen);
							} else {
								setGenresOpen(!genresOpen);
							}
						}}>
						<p>Genres</p>
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
					<label className={styles['label-tittle']}>Price</label>
					<PriceSlider />
				</div>
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if (genresOpen || orderPriceOpen) {
								setGenresOpen(false);
								setOrderPriceOpen(false)
								setOrderOpen(!orderOpen);
							} else {
								setOrderOpen(!orderOpen);
							}
						}}>
						<p>Order A-Z</p>
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
				<div className={styles['options-container']}>
					<label
						className={styles['label-tittle']}
						onClick={() => {
							if ( genresOpen || orderOpen) {
								setGenresOpen(false);
								setOrderOpen(false);
								setOrderPriceOpen(!orderPriceOpen)
							} else {
								setOrderPriceOpen(!orderPriceOpen)
							}
						}}>
						<p>Order Price</p>
					</label>
					<select
						multiple={selectAttribute}
						className={orderPriceOpen ? styles.open : ''}>
						{optionOrder.map((option) => (
							<option
								key={option}
								value={option}
								onClick={selectPriceOrder}>
								{option}
							</option>
						))}
					</select>
				</div>
				<button className={styles.buttonFilter} onClick={filterTheSearch}>
					<p>Apply Filter</p>
				</button>
			</aside>
		</div>
	);
};