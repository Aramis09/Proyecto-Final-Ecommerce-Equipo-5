import { useState,useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { searchName } from "../../redux/reducer/productReducer";
import { getProductsByFilters } from "../../redux/actions/productAction";
import style from "./SearchBar.module.scss";
import iconSearch from "./images/icon_search.png";
import { Link } from "react-router-dom";

export const SearchBar = (flag:any) => {
  const [Search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleClickSubmit = (event: any) => {
    event.preventDefault();
    dispatch(searchName(Search));
    dispatch(
      getProductsByFilters(
        //NO TOCAR
        {
          name: Search,
          filters: {
            genres: [],
            platform: [],
            priceRange: [0, 100],
          },
          order: {
            alphabetic: "",
            price: "",
          },
        },1
      )
    );
  };
  const handleInputChange = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div className={style.containerSearch}>
      <input
        className={style.Input}
        type="text"
        placeholder="Search Video Games"
        onChange={(event) => handleInputChange(event)}
      />

      <button
        className={style.But}
        type="submit"
        onClick={(event) => handleClickSubmit(event)}
      >
        <Link to="/products">
          <img className={style.iconSearch} src={iconSearch} alt="iconSearch" />
        </Link>
      </button>
    </div>
  );
};
