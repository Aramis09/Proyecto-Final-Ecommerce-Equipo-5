import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import arrowBack from "../../../assets/arrow-back.svg";
import styles from "./DashboardNav.module.scss";

export const DashboardNav = () => {
  const { user } = useAuth0();

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
          <Link to={"/discMan"}>
            <div>Discounts</div>
          </Link>
        </div>
        <div className={styles["user-info"]}>
          <div>
            <img src={user?.picture} alt="" />
          </div>
          <h5>admin</h5>
        </div>
      </nav>
    </>
  );
};
