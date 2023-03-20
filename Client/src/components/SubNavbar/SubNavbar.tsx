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
    console.log(state.show)
    return (
        <div className={changeClass.class}>
            <ShoppingCart/>
            <Link to = "/library" className={styles.buttons} >Library</Link>
            <Link to = "/wish" className={styles.buttons}> Wish</Link>
            <Link to = "/friends" className={styles.buttons} >Friends</Link>
        </div>
    );
};
export default SubNavbar;

