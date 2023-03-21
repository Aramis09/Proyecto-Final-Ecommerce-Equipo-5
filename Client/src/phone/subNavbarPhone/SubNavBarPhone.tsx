import { Link } from "react-router-dom";
import styles from "./SubNavBar.module.scss";
import { useState,useEffect } from "react";
const SubNavbarPhone = (flags:any) => {
    const [changeClass,setChangeClass] = useState({classContainer:styles.containerHide});
    useEffect(() => {
        flags.flagMenu ? setChangeClass({classContainer:styles.containerShow}):setChangeClass({classContainer:styles.containerHide})
    },[flags]);
    
    return (
        <div className={changeClass.classContainer}>
            <Link to = "/users" className={styles.buttons} >Admin</Link>
            <Link to = "/library" className={styles.buttons} >Library</Link>
            <Link to = "/wish" className={styles.buttons}> Wish</Link>
            <Link to = "/friends" className={styles.buttons} >Friends</Link>
            
        </div>
    );
};

export default SubNavbarPhone;