import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { getListGenres } from "../../redux/actions/genresAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setTodaysDiscount, onOffAdminDiscount, setAutoGlobalDiscount} from "../../redux/reducer/productReducer";
import { setGlobalDiscount } from "../../redux/actions/productAction";
import style from "./style.module.css";

export const DiscountManager = () => {

    const dispatch = useAppDispatch();
    const [discAppliedFromAdmin, setDiscAppliedFromAdmin] = useState(false);
    const [allGenres, setAllGenres] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [activeAdmin, setActiveAdmin] = useState(false);
    const [showActiveDiscount, setShowActiveDiscount] = useState({});

    
    //let allDaysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let defaultDiscounts = ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
    let genresList = useAppSelector((state) => state.genresReducer.listGenresData);
    let adminDiscount = useAppSelector((state) => state.productReducer.adminDiscount);
    let discountActive = useAppSelector((state) => state.productReducer.todaysDiscount)

    const selectDisc = (e) => {
        let disc = parseFloat(e.target.value)
        setSelectedDiscount(prev => prev = disc)
    }
    
    const selectGenre = (e) => {
        let genre = e.target.value;
        setSelectedGenre(genre)
    }

    const applyAdminDiscount = () => {
        dispatch(setTodaysDiscount({genre: selectedGenre, discount: selectedDiscount}));
        dispatch(onOffAdminDiscount(true));
        dispatch(setAutoGlobalDiscount(false));
        setSelectedGenre('')
        setSelectedDiscount('')
    }
    
    const backToDefault = () => {
        setSelectedDiscount('');
        setSelectedGenre('');
        dispatch(setGlobalDiscount())
        dispatch(setAutoGlobalDiscount(true));
        dispatch(onOffAdminDiscount(false))
    }

    const eraseSelection = () => {
        setSelectedDiscount('');
        setSelectedGenre('')
    }

    
    useEffect(() => {
        dispatch(getListGenres());
    }, [])

    useEffect(() => {
        if(genresList.length>0 && allGenres.length === 0){
            setAllGenres(genresList)
        }
    }, [genresList])

    useEffect(() => {
        setActiveAdmin(prev => prev = adminDiscount)
    }, [adminDiscount])

    useEffect(() => {
        setShowActiveDiscount(discountActive)
    }, [discountActive])

    console.log('gl', selectedDiscount, selectedGenre)
    return(
        <div>
            <NavBar/>
            <h1>Discount settings</h1>
            <div className={style.box}>
                <div>
                    <h2>Discounts</h2>
                    <ul>
                    {
                        defaultDiscounts.map((disc, index) => {
                            return(<li key={index}>
                                <button value={disc} onClick={selectDisc}>{disc}</button>
                                {
                                    disc === '0.0' &&
                                    <div>No Discount</div>
                                }
                                {
                                    disc === '1' &&
                                    <div>Free</div>
                                }
                            </li>)
                        })
                        //<input placeholder="Personalized discount" type="text"/>
                    }
                    </ul>
                </div>
                <div>
                    <h2>Genres</h2>
                    <ul>
                        {
                            allGenres.length>0 &&
                            allGenres.map((genre, index) => {
                                return(
                                    <li key={index}>
                                        <button value={genre.name} onClick={selectGenre}>{genre.name}</button>     
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    {
                        (selectedDiscount || selectedGenre) &&
                        <div>
                            Selection Waiting For Appliance:
                            {
                                selectedDiscount &&
                                <div>Selected disc: {selectedDiscount}</div>
                            }
                            {
                                selectedGenre &&
                                <div>Selected genre: {selectedGenre}</div>
                            }
                            <button onClick={eraseSelection}>Erase Selection</button>
                        </div>
                    }
                </div>
            </div>
            <br></br>
            <button onClick={applyAdminDiscount}>Apply discount</button>
            {
                activeAdmin?
                <button onClick={backToDefault}>Reset</button>
                :
                <button onClick={backToDefault} disabled >Reset</button>
                
            }
            <div>
                {
                    activeAdmin ?
                    <div>
                        <h4>Admin discount is On.</h4>
                        <div>DISC: {showActiveDiscount.discount*100}%</div>
                        <div>GENRE: {showActiveDiscount.genre}</div>
                    </div>
                    :
                    <div>
                        <h4>Default discount is Active.</h4>
                        <div>DISC: {showActiveDiscount.discount*100}%</div>
                        <div>GENRE: {showActiveDiscount.genre}</div>
                    </div>
                }
            </div>
        </div>
    )
}

/*
                {
                    
                    <div>
                    {
                        allDaysArray.map(day => {
                            return(<button>{day}</button>)
                        })
                    }
                </div>
                    
            }
*/