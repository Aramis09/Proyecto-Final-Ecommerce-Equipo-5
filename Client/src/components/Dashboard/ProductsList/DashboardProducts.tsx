import { DashboardNav } from "../Nav/DashboardNav";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getListUsers } from "../../../redux/actions/userAction";
import { getAllProducts } from "../../../redux/actions/productAction";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { EDIT_PRODUCT } from "../../../utils/constants";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProductState, setNewProductState] = useState(true);
  const [newProductName, setNewProductName] = useState("");
  const [newProductRating, setNewProductRating] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

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

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductName(event.target.value);
  };

  const handleProductRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductRating(event.target.value);
  };

  const handleProductPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductPrice(event.target.value);
  };

  console.log("💻 Name: " + newProductName);

  const handlerProductChange = async (
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
      name: newProductName,
      background_image,
      rating: newProductRating,
      playtime,
      price: newProductPrice,
      description,
      released,
      state: newProductState,
      genres,
      images,
    };

    console.log(productsData);

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
      <section
        className={
          showModal
            ? styles["product-container-blur"]
            : styles["product-container"]
        }
      >
        <div className={styles["head-products"]}>
          <h3>Products</h3>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            modify
          </button>
        </div>
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
                onClick={() => {
                  handlerProductChange(
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
                  );
                }}
              >
                make Changes
              </button>
            </div>
          )
        )}
      </section>
      {showModal && (
        <div className={styles.modal}>
          <h2>Editar producto</h2>
          <label htmlFor="productName">Nombre:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={newProductName}
            onChange={handleProductNameChange}
          />

          <label htmlFor="productRating">Rating:</label>
          <input
            type="text"
            id="productRating"
            name="productRating"
            value={newProductRating}
            onChange={handleProductRatingChange}
          />

          <label htmlFor="productPrice">Precio:</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={newProductPrice}
            onChange={handleProductPriceChange}
          />

          <label htmlFor="productDescription">Description: </label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
          />

          <label htmlFor="productState">State</label>
          <input
            type="checkbox"
            name="productState"
            id="productState"
            checked={newProductState}
            onChange={(event) => setNewProductState(event.target.checked)}
          />

          <button onClick={() => setShowModal(false)}>Guardar</button>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}
    </>
  );
};
