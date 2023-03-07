import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import icon from "../../assets/joystick_icon.png";

export const NavBar = () => {
  return (
    // <div className={style.mainContainer}>
      <nav className={style.mainContainer}>
        <div className={style.listContainer}>
          <Link to ="/">
            <img src={icon} alt="joystick_icon" />
          </Link>
          <SearchBar/>
          <button className={style.loginButton}>LOGIN</button>
        </div>
      </nav>
    // </div>
  );
};