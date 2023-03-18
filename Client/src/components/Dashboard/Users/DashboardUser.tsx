import { DashboardNav } from "../Nav/DashboardNav";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getListUsers } from "../../../redux/actions/userAction";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BLOCK_USER, USER_ADMIN } from "../../../utils/constants";
import axios from "axios";
import styles from "./DashboardUsers.module.css";

export const DashboardUser = () => {
  const dispatch = useAppDispatch();
  let listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  const { user } = useAuth0();
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const handlerChangeBlocked = async (emailUser: string) => {
    const emailAdmin = user?.email;
    const adminUser = listUsersData.find((item) => {
      if (item.email === emailAdmin) {
        return item.secret;
      }
    });
    const data = {
      emailAdmin: emailAdmin,
      secret: adminUser?.secret,
      emailUser: emailUser,
    };
    await axios.post(BLOCK_USER, data);
  };

  const handlerChangeAdmin = async (emailUser: string) => {
    const emailAdmin = user?.email;
    const adminUser = listUsersData.find((item) => {
      if (item.email === emailAdmin) {
        return item.secret;
      }
    });

    const data = {
      emailAdmin: emailAdmin,
      secret: adminUser?.secret,
      emailUser: emailUser,
      newSecret: adminUser?.secret,
    };

    console.log(data);
    await axios.post(USER_ADMIN, data);
  };

  return (
    <>
      <input
        type="text"
        value={newSearch}
        onChange={(event: any) => setNewSearch(event.target.value)}
      />
      <DashboardNav />
      <section className={styles["user-container"]}>
        <h3>Users</h3>
        <div className={styles["user-info"]}>
          <p>name</p>
          <p>email</p>
          <p>blocked</p>
        </div>
        {listUsersData.map(({ admin, email, blocked, name }, index) => (
          <div className={styles["user-items"]} key={index}>
            <p>{name}</p>
            <p>{email}</p>
            <button onClick={() => handlerChangeBlocked(email)}>
              {blocked === true ? "blocked" : "no blocked"}
            </button>
            <button onClick={() => handlerChangeAdmin(email)}>
              {admin === true ? "admin" : "no Admin"}
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
