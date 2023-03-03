import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import icon from "../../assets/joystick_icon.png";

export const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <nav>
        <ul className={style.listContainer}>
          <li>
            <Link to={"/"}>
              <img
                className={style.navbarIcon}
                src={icon}
                alt="joystick_icon" />
            </Link>
          </li>
          <li>SEARCHBAR</li>
          <li>
            <button className={style.loginButton}>LOGIN</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
