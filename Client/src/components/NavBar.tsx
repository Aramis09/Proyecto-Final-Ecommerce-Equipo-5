import style from '../styles/NavBar.module.css';



export const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <nav>
        <ul className={style.listContainer}>
          <li className={style.listItem}>
            ICON
          </li>
          <li>
            HOME
          </li>
          <li>
            LOGIN
          </li>
          <li>
            CONTACT US
          </li>
        </ul>
      </nav>
    </div>
  );
};