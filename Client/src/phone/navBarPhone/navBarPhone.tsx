import { useEffect,useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import SubNavbarPhone from "../subNavbarPhone/SubNavBarPhone";
import icon from "../../components/NavBar/images/icon.png";
import menu from "./images/menu.png";
import styles from "./navBarPhone.module.scss";
import { Link } from "react-router-dom";
const NavbarPhone = () => {
    const [flagSubMenu,setMenu] = useState(false);

    return (
        <div className={styles.conatinerAll}>
            <div className={styles.containerUpNavbar}>
                <Link to = "/" className={styles.links}>
                    <img src={icon} alt="joystick_icon" className={styles.iconCompany} />   
                </Link>
                <SearchBar/>
            </div>
            <img src={menu} alt="menu" className={styles.iconMenu} onClick={()=>setMenu(!flagSubMenu)}/>
            <SubNavbarPhone
                flagMenu = {flagSubMenu}
            />
        </div>
    );
};

export default NavbarPhone;