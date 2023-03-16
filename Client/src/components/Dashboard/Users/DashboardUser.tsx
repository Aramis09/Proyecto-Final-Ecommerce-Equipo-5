import { DashboardNav } from "../Nav/DashboardNav";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getListUsers } from "../../../redux/actions/userAction";
import styles from "./DashboardUsers.module.css";
import { useEffect } from "react";

export const DashboardUser = () => {
  const dispatch = useAppDispatch();
  let listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  return (
    <>
      <DashboardNav />
      <section className={styles["user-container"]}>
        <h3>Users</h3>
        <div className={styles["user-info"]}>
          <p>id</p>
          <p>name</p>
          <p>email</p>
          <p>Admin</p>
        </div>
        {listUsersData.map(({admin, email, blocked}, index) => (
          <div className={styles["user-items"]} key={index}>
            <p>{admin}</p>
            <p>{blocked}</p>
            <p>{email}</p>
            <button>{admin === true ? 'admin' : 'no Admin'}</button>
          </div>
        ))}
      </section>
    </>
  );
};
