import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import icon from "../../assets/joystick_icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";


export const NavBar = () => {
  
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

  return (
    // <div className={style.mainContainer}>
      <nav className={style.mainContainer}>
        <div className={style.listContainer}>
          <Link to ="/">
            <img src={icon} alt="joystick_icon" />
          </Link>
          <SearchBar/>

         { isAuthenticated ? <button className={style.loginButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>LOG OUT</button> :
         <button className={style.loginButton}  onClick={() => loginWithRedirect()}>LOGIN</button>}

        </div>
      </nav>
    // </div>
  );
};