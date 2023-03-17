import { DashboardNav } from "../Nav/DashboardNav";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getListUsers } from "../../../redux/actions/userAction";
import { getAllProducts } from "../../../redux/actions/productAction";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { EDIT_PRODUCT } from "../../../utils/constants";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
  let listProducts = useAppSelector(
    (state) => state.productReducer.allProductsData
  );
  let listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  const { user } = useAuth0();
  const getAdmins = listUsersData.map((user) => {
    if (user.admin === true) return user;
  });

  const admin = getAdmins.find((item) => item?.email === user?.email);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getListUsers());
  }, []);

  const handlerChangeState = async (
    name: string,
    rating: string,
    id: number,
    price: string,
    state: boolean,
    images: string[],
    genres: string[],
    background_image: string,
    description: string,
    platforms: string[],
    playtime: number,
    stores: string[],
    released: string
  ) => {
    const emailAdmin = admin?.email;
    const data = {
      emailAdmin: emailAdmin,
      secret: admin?.secret,
    };

    const productsData = {
      id,
      name,
      background_image,
      rating,
      playtime,
      price,
      description,
      released,
      state: !state,
      genres,
      images,
    };

    const config = {
      url: EDIT_PRODUCT,
      data,
      params: productsData,
    };
    await axios.post(config.url, config.data, { params: config.params });
  };

  return (
    <>
      <DashboardNav />
      <section className={styles["product-container"]}>
        <h3>Products</h3>
        <div className={styles["product-info"]}>
          <p>id</p>
          <p>name</p>
          <p>rating</p>
          <p>price</p>
          <p>state</p>
        </div>
        {listProducts.map(
          (
            {
              name,
              rating,
              id,
              price,
              state,
              images,
              genres,
              background_image,
              description,
              platforms,
              playtime,
              stores,
              released,
            },
            index
          ) => (
            <div className={styles["product-item"]} key={index}>
              <p>{id}</p>
              <p>{name}</p>
              <p>{rating}</p>
              <p>{price}</p>
              <button
                onClick={() =>
                  handlerChangeState(
                    name,
                    rating,
                    id,
                    price,
                    state,
                    images,
                    genres,
                    background_image,
                    description,
                    platforms,
                    playtime,
                    stores,
                    released
                  )
                }
              >
                {state === true ? "True" : "False"}
              </button>
            </div>
          )
        )}
      </section>
    </>
  );
};
