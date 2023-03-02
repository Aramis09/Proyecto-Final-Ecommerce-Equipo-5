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