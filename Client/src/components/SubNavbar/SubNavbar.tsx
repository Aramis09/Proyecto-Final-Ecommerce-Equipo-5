import { Link } from "react-router-dom";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useState, useEffect } from "react";
import styles from "./SubNavbar.module.scss";
const SubNavbar = (state:any) => {

    const [changeClass,setChangeClass] = useState({class:styles.containerShow});
    useEffect(()=>{
        (()=>{
            state.show ? setChangeClass({class:styles.containerShow}) : setChangeClass({class:styles.containerHide})
        })();
    },[state])
    return (
        <div className={changeClass.class}>
            { state.isAdmin ? <Link to = "/users" className={styles.buttons} >Admin</Link> : <p></p>}
            <Link to = "/library" className={styles.buttons} >Library</Link>
            <Link to = "/wish" className={styles.buttons}> Wish</Link>
            <Link to = "/friends" className={styles.buttons} >Friends</Link>
            <ShoppingCart/>
        </div>
    );
};
export default SubNavbar;

