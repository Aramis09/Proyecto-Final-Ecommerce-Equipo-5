import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { DashboardNav } from "../Nav/DashboardNav";
import { getListUsers } from "../../../redux/actions/userAction";
import { salesExample } from "../userExample";
import styles from "./DashboardSales.module.scss";

export const DashboardSales = () => {
  const dispatch = useAppDispatch();
  let listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  const [searchUser, setSearchUser] = useState("");
  const [newSearch, setNewSearch] = useState([]);
  const [filteredSales, setFilteredSales] = useState(salesExample);

  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const handlerSearch = () => {
    const searchedUser = listUsersData.filter((user) =>
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    );

    console.log(searchedUser)

    if (searchedUser) {
      setFilteredSales(
        salesExample.filter((sale) => sale.UserEmail === searchedUser.email)
      );
    } else {
      setFilteredSales([]);
    }
  };

  const handleClear = () => {
    setNewSearch([]);
  };

  return (
    <>
      <input
        type="text"
        value={searchUser}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchUser(event.target.value)
        }
      />
      <button onClick={() => handlerSearch()}>search</button>
      <button onClick={handleClear}>clean</button>
      <DashboardNav />
      <section className={styles["sales-container"]}>
        <h3>Sales</h3>
        <div className={styles["sales-info"]}>
          <p>id</p>
          <p>name</p>
          <p>price</p>
          <p>email</p>
        </div>
        {filteredSales.map(
          ({ id, Product, UserEmail, priceUnitNet }, index) => (
            <div className={styles["sales-items"]} key={index}>
              <p>{id}</p>
              <p>{Product.name}</p>
              <p>{priceUnitNet}</p>
              <p>{UserEmail}</p>
            </div>
          )
        )}
      </section>
    </>
  );
};
