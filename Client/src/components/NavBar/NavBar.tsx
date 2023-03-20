import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
// import icon from "../../assets/joystick_icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect,useState } from "react";
import icon from "./images/icon.png";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";

export const NavBar = () => {
  const [showSubNavBar,setShowSubNavBar] = useState(false);
  const {
    loginWithRedirect,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const addNewUser = async () => {
      if (typeof user !== "undefined") {
        await axios.get(
          `http://localhost:3001/user/userNew?email=${user.email}&name=${user.name}&image=${user.picture}`
        );
      }
    };
    addNewUser();
  }, []);

  const saveToken = (getAccessTokenSilently: string) => {
    window.localStorage.setItem("token", getAccessTokenSilently);
  };

  return (
    <nav className={style.mainContainer} >
      <div className={style.listContainer} onClick={()=>setShowSubNavBar(!showSubNavBar)}>
        <Link to="/">
          <img className={style.home} src={icon} alt="joystick_icon"/>
        </Link>
        {/* <ShoppingCart /> */}
        <SearchBar />
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
      />
    </nav>
  );
};
