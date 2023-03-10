import { Link } from "react-router-dom";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import icon from "../../assets/joystick_icon.png";
import { Transaccion } from "../../pages/mercadoPagoTesting/mpLink";

export const NavBar = () => {

  const dispatch = useAppDispatch()

  const eraseSearch = () => {
    dispatch(eraseSearchedData())
  }

  return (
    <div className={style.mainContainer}>
      <nav>
        <ul className={style.listContainer}>
          <li>
            <Link to="/">
              <img src={icon} alt="joystick_icon" onClick={eraseSearch}/>
            </Link>
          </li>
          <li><SearchBar /></li>
          <li><Link to='/mptest'>Transaccion</Link></li>
          <li>
            <button className={style.loginButton}>LOGIN</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
