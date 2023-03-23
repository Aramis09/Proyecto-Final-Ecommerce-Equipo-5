import { useEffect, useState } from "react";
import { getListGenres } from "../../redux/actions/genresAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  setTodaysDiscount,
  onOffAdminDiscount,
  setAutoGlobalDiscount,
} from "../../redux/reducer/productReducer";
import { setGlobalDiscount } from "../../redux/actions/productAction";
import style from "./style.module.css";
import { DashboardNav } from "../Dashboard/Nav/DashboardNav";
import { DiscountState } from "../../types";

export const DiscountManager = () => {
  const dispatch = useAppDispatch();
  const [discAppliedFromAdmin, setDiscAppliedFromAdmin] = useState(false);
  const [allGenres, setAllGenres] = useState<object[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [activeAdmin, setActiveAdmin] = useState(false);
  // @ts-ignore
  const [showActiveDiscount, setShowActiveDiscount] = useState<DiscountState>({});


  //let allDaysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let defaultDiscounts = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];
  let genresList = useAppSelector(
    (state) => state.genresReducer.listGenresData
  );
  let adminDiscount = useAppSelector(
    (state) => state.productReducer.adminDiscount
  );
  let discountActive = useAppSelector(
    (state) => state.productReducer.todaysDiscount
  );

  const selectDisc = (e:any) => {
    let disc = parseFloat(e.target.value);
    setSelectedDiscount((prev) => (prev = disc));
  };

  const selectGenre = (e:any) => {
    let genre = e.target.value;
    setSelectedGenre(genre);
  };

  const applyAdminDiscount = () => {
    dispatch(
      setTodaysDiscount({ genre: selectedGenre, discount: selectedDiscount })
    );
    dispatch(onOffAdminDiscount(true));
    dispatch(setAutoGlobalDiscount(false));
    setSelectedGenre("");
    setSelectedDiscount(0);
  };

  const backToDefault = () => {
    setSelectedDiscount(0);
    setSelectedGenre("");
    dispatch(setGlobalDiscount());
    dispatch(setAutoGlobalDiscount(true));
    dispatch(onOffAdminDiscount(false));
  };

  const eraseSelection = () => {
    setSelectedDiscount(0);
    setSelectedGenre("");
  };

  useEffect(() => {
    dispatch(getListGenres());
  }, []);

  useEffect(() => {
    if (genresList.length > 0 && allGenres.length === 0) {
      setAllGenres(genresList);
    }
  }, [genresList]);

  useEffect(() => {
    setActiveAdmin((prev) => (prev = adminDiscount));
  }, [adminDiscount]);

  useEffect(() => {
    // @ts-ignore
    setShowActiveDiscount(discountActive);
  }, [discountActive]);

  const handleChangeNumber = (event: any) => {
    const discount = Number(event);
    setSelectedDiscount(discount);
  };

  return (
    <div className={style["discount-container"]}>
      <DashboardNav />
      <h1>Discount settings</h1>
      <h2>Discounts</h2>
      <div className={style["discount-list"]}>
        <input
          type="number"
          value={selectedDiscount}
          onChange={(event) => {
            handleChangeNumber(event.target.value);
          }}
          placeholder="customized discount"
          min={0}
          max={100}
        />
        <div className={style["search-discount"]}>
          {
            defaultDiscounts.map((disc, index) => {
              return (
                <button
                  value={disc}
                  onClick={selectDisc}
                  key={index}
                  className={style["discount-button"]}
                >
                  {disc}
                </button>
              );
            })
            //<input placeholder="Personalized discount" type="text"/>
          }
        </div>
      </div>
      <h2>Genres</h2>
      <div className={style["genres-list"]}>
        {allGenres.length > 0 &&
          allGenres.map(({name}:any, index) => {
            return (
              <button value={name} onClick={selectGenre} key={index} className={style['genres-button']}>
                {name}
              </button>
            );
          })}
      </div>
      <div>
        {(selectedDiscount || selectedGenre) && (
          <div>
            Selection Waiting For Appliance:
            {selectedDiscount && <div>Selected disc: {selectedDiscount}</div>}
            {selectedGenre && <div>Selected genre: {selectedGenre}</div>}
            <button onClick={eraseSelection}>Erase Selection</button>
          </div>
        )}
      </div>
      <br></br>
      <button onClick={applyAdminDiscount}>Apply discount</button>
      {activeAdmin ? (
        <button onClick={backToDefault}>Reset</button>
      ) : (
        <button onClick={backToDefault} disabled>
          Reset
        </button>
      )}
      <div>
        {activeAdmin ? (
          <div>
            <h4>Admin discount is On.</h4>
            <div>DISC: {showActiveDiscount.discount}%</div>
            <div>GENRE: {showActiveDiscount.genre}</div>
          </div>
        ) : (
          <div>
            <h4>Default discount is Active.</h4>
            <div>DISC: {showActiveDiscount.discount}%</div>
            <div>GENRE: {showActiveDiscount.genre}</div>
          </div>
        )}
      </div>
    </div>
  );
};