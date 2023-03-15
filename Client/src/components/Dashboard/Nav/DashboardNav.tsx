import { Link } from "react-router-dom";
import arrowBack from "../../../assets/arrow-back.svg";
import styles from "./DashboardNav.module.css";

export const DashboardNav = () => {
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
            <img src="https://picsum.photos/200/300" alt="" />
          </div>
          <div>admin@mail.com</div>
        </div>
      </nav>
    </>
  );
};
