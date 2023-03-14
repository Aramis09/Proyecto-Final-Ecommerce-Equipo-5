import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart';
import icon from "../../assets/joystick_icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import axios from "axios";


export const NavBar = () => {
  
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    const addNewUser = async () => {
      if(typeof user !== 'undefined'){
        await axios.get(`http://localhost:3001/user/userNew?email=${user.email}`);
      }
    }
    addNewUser()
  })

  return (
		<nav className={style.mainContainer}>
			<div className={style.listContainer}>
				<Link to='/'>
					<img className={style.home} src={icon} alt='joystick_icon' />
				</Link>
				<SearchBar />
				<ShoppingCart />

				{isAuthenticated ? (
					<button
						className={style.loginButton}
						onClick={() =>
							logout({ logoutParams: { returnTo: window.location.origin } })
						}>
						LOG OUT
					</button>
				) : (
					<button
						className={style.loginButton}
						onClick={() => loginWithRedirect()}>
						LOG IN
					</button>
				)}
			</div>
		</nav>
	);
};
