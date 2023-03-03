<<<<<<< HEAD
import style from './NavBar.module.css';
import icon from '../../assets/joystick_icon.png';



export const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <nav>
        <ul className={style.listContainer}>
          <li>
            <img src={icon} alt="joystick_icon" />
          </li>
          <li>
            SEARCHBAR
          </li>
          <li>
            <button className={style.loginButton}>LOGIN</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
=======
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
              <img src={icon} alt="joystick_icon" />
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
>>>>>>> c7621a519d5c7c592ef8ae839718b8997b94e158
