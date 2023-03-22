import { Link } from "react-router-dom";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useState, useEffect } from "react";
import styles from "./SubNavbar.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { getListUsers } from "../../redux/actions/userAction";
const SubNavbar = (state:any) => {
    const [changeClass,setChangeClass] = useState({class:styles.containerShow});
    const dispatch = useAppDispatch();
    const { user , isAuthenticated} = useAuth0();
    const userEmail = user?.email;
    const listUsersData = useAppSelector(
        (state) => state.userReducer.listUsersData
        );
    useEffect(()=>{
        (()=>{
            state.show ? setChangeClass({class:styles.containerShow}) : setChangeClass({class:styles.containerHide})
        })();
    },[state]);

    useEffect(() => {
        dispatch(getListUsers());
    }, []);
    
    const admin = listUsersData.find((item) => item.email === userEmail);

    return (
        <div className={changeClass.class}>
            {admin?.admin && (
                <Link to = "/users" className={styles.buttons} >Admin</Link>
            )}
            <Link to = "/library" className={styles.buttons} >Library</Link>
            {isAuthenticated===true && <Link to = "/wish" className={styles.buttons}> Wish</Link>}
            <Link to = "/friends" className={styles.buttons} >Friends</Link>
            <ShoppingCart/>
        </div>
    );
};
export default SubNavbar;

