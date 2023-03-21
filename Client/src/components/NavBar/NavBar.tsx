import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import iconArrow from "./images/arrow.png";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect,useState } from "react";
import icon from "./images/icon.png";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import { useAppSelector } from "../../redux/hooks/hooks";


export const NavBar = () => {
  const [showSubNavBar,setShowSubNavBar] = useState(false);
  
  const {
    loginWithRedirect,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  //Verificamos si el usuario logueado es admin
  const userEmail = user?.email;
  const listUsersData = useAppSelector((state) => state.userReducer.listUsersData);
  const admin = listUsersData.find((item) => item.email === userEmail);
  let isAdmin: boolean = false;
  if(admin) {
    isAdmin = admin.admin;
  }


  const saveToken = (getAccessTokenSilently: string) => {
    window.localStorage.setItem("token", getAccessTokenSilently);
  };

  return (
    <nav className={style.mainContainer} >
      <div className={style.listContainer} >
        <Link to="/" className={style.home}>
          <img src={icon} alt="joystick_icon" />
        </Link>
        <div className={style.containerSearch}>
          <img src={iconArrow} alt="arrowIcon" onClick={()=>setShowSubNavBar(!showSubNavBar)}/>
          <SearchBar />
        </div>
        {isAuthenticated ? (
            <button
              className={style.loginButton}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              LOG OUT
            </button>
        ) : (
          <button
            className={style.loginButton}
            onClick={async () => {
              loginWithRedirect();
              const token = await getAccessTokenSilently();
              saveToken(token);
            }}
          >
            LOG IN
          </button>
        )}
      </div>
      <SubNavbar
        show = {showSubNavBar}
        isAdmin = {isAdmin}
      />
    </nav>
  );
};
