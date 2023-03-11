import { Link } from "react-router-dom";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart';
import icon from "../../assets/joystick_icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";


export const NavBar = () => {

  const dispatch = useAppDispatch()

  const eraseSearch = () => {
    dispatch(eraseSearchedData())
  }
  
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

  return (
      <nav className={style.mainContainer}>
        <div className={style.listContainer}>
          <Link to ="/">
            <img src={icon} alt="joystick_icon" />
          </Link>
          <SearchBar/>
		      <ShoppingCart />

          { isAuthenticated ? <button className={style.loginButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>LOG OUT</button> :
         <button className={style.loginButton}  onClick={() => loginWithRedirect()}>LOGIN</button>}

        </div>
      </nav>
  );
};
