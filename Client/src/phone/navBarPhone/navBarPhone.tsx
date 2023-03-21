import { useEffect,useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import SubNavbarPhone from "../subNavbarPhone/SubNavBarPhone";
import icon from "../../components/NavBar/images/icon.png";
import menu from "./images/menu.png";
import styles from "./navBarPhone.module.scss";
const NavbarPhone = () => {
    const [flagSubMenu,setMenu] = useState(false);

    return (
        <div className={styles.conatinerAll}>
            <div className={styles.containerUpNavbar}>
                <img src={icon} alt="joystick_icon" className={styles.iconCompany} />
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