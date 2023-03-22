import { Link } from "react-router-dom";
import styles from "./SubNavBar.module.scss";
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { getListUsers } from "../../redux/actions/userAction";
const SubNavbarPhone = (flags:any) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth0();
    const [changeClass,setChangeClass] = useState({classContainer:styles.containerHide});
    const userEmail = user?.email;
    const listUsersData = useAppSelector(
        (state) => state.userReducer.listUsersData
        );
        

    useEffect(() => {
        flags.flagMenu ? setChangeClass({classContainer:styles.containerShow}):setChangeClass({classContainer:styles.containerHide})
        dispatch(getListUsers());
    },[flags]);
    

    const admin = listUsersData.find((item) => item.email === userEmail);
    
    return (
        <div className={changeClass.classContainer}>
            {admin?.admin && (
                <Link to = "/users" className={styles.buttons} >Admin</Link>
            )}
            <Link to = "/library" className={styles.buttons} >Library</Link>
            <Link to = "/wish" className={styles.buttons}> Wish</Link>
            <Link to = "/friends" className={styles.buttons} >Friends</Link>
            
        </div>
    );
};

export default SubNavbarPhone;