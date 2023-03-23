import { Filters } from "../../components/Filters/Filters";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect,useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { getListGenres } from "../../redux/actions/genresAction";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import iconFilters from "./images/filter.png";
import { Link } from "react-router-dom";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { style } from "@mui/system";
import { getProductsByFilters } from "../../redux/actions/productAction";

export const Products = () => {
  const [changeClass,setChangeClass] = useState(false);
  const [pageNumber,setPageNumber] = useState(1);  
  const [productList,setProductList] = useState<object[]>([]);
  let searchedData = useAppSelector((state) => state.productReducer.searchedData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListGenres());
    
    return () => {
      dispatch(eraseSearchedData())
    }
  }, []);

  useEffect(() => {
    if(!productList.length){
      dispatch(
        getProductsByFilters({
          name: "",
          filters: {
            genres: [],
            platform: [],
            priceRange: [0, 100],
          },
          order: {
            alphabetic: "",
            price: "",
          },
        },
        1
        )
      );
      setProductList(searchedData);
      
    };
  },[searchedData]);

  const changePageHanlder = (ev:any) => {
    const currentPageNumber:string = ev.target.value;
    setPageNumber(Number(currentPageNumber));
  };
  return (
    <div className={styles.containerAll}>
      {window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
      <div className={styles["page-container"]}>
      <img className={styles.iconCarrito} src={iconFilters} alt="soppingCart" onClick={()=> setChangeClass(!changeClass)}/>
      <Filters 
      flag = {changeClass}
      pageNumber = {pageNumber}
      /> 
        {
          (searchedData.length && searchedData.length>0)
          ?
          searchedData.map((item: any, index: number) => {
            //console.log()(item)
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
                  state={item.state}
                />
              {/* </Link> */}
            </div>)
          })
          :
          <p>Cargando</p>
        }
      </div>
        <div className={styles.paginate}>
          <button value="1" onClick={changePageHanlder}>1</button>
          <button value="2" onClick={changePageHanlder}>2</button>
          <button value="3" onClick={changePageHanlder}>3</button>
          <button value="4" onClick={changePageHanlder}>4</button>
          <button value="5" onClick={changePageHanlder}>5</button>
          <button value="6" onClick={changePageHanlder}>6</button>
        </div>
      
    </div>
  );
};