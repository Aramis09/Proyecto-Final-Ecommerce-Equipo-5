import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { DashboardNav } from "../Nav/DashboardNav";
import { getListUsers } from "../../../redux/actions/userAction";
import { ListSales } from "../../../types";
import styles from "./DashboardSales.module.scss";
import { getPurchaseList } from "../../../Controller/DashBoardController";

export const DashboardSales = () => {
  const dispatch = useAppDispatch();
  const listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  const [searchUser, setSearchUser] = useState<string>("");
  const [listSales, setListSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState<ListSales[]>([]);

  useEffect(() => {
    dispatch(getListUsers());
    if (!listSales.length) {
      getPurchaseList().then((list: any) => {
        setFilteredSales(list);
        setListSales(list);
      });
    }
  }, [dispatch]);

  const handlerSearch = () => {
    const searchedUser = listUsersData.find((user) =>
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    );
    if (searchedUser) {
      const filtered = listSales.filter(
        (sale: any) => sale.UserEmail === searchedUser.email
      );
      setFilteredSales(filtered);
    } else {
      setFilteredSales([]);
    }
  };

  const handleClear = () => {
    setSearchUser("");
    setFilteredSales(listSales);
  };

  return (
    <>
      <div className={styles.nav}>
        <DashboardNav />
      </div>{" "}
      <input
        type="text"
        value={searchUser}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchUser(event.target.value)
        }
      />
      <button onClick={handlerSearch}>search</button>
      <button onClick={handleClear}>clean</button>
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
            <div className={styles["sales-items"]} key={id + "-" + index}>
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
