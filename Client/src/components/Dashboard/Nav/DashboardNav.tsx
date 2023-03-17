import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import arrowBack from "../../../assets/arrow-back.svg";
import styles from "./DashboardNav.module.css";

export const DashboardNav = () => {

  const {user} = useAuth0();

  return (
    <>
      <nav className={styles["container"]}>
        <div className={styles["options-container"]}>
          <Link to={"/"}>
            <img src={arrowBack} alt="go" />
          </Link>
          <Link to={"/users"}>
            <div>Users</div>
          </Link>
          <Link to={"/productsList"}>
            <div>Products</div>
          </Link>
          <Link to={"/sales"}>
            <div>Sales</div>
          </Link>
        </div>
        <div className={styles["user-info"]}>
          <div>
            <img src={user?.picture} alt="" />
          </div>
          <div className={styles.email}>{user?.email}</div>
        </div>
      </nav>
    </>
  );
};
