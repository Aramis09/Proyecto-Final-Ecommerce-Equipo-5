import { DashboardNav } from "../Nav/DashboardNav";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { getListUsers } from "../../../redux/actions/userAction";
import { getAllProducts } from "../../../redux/actions/productAction";
import { useAuth0 } from "@auth0/auth0-react";
import { EDIT_PRODUCT } from "../../../utils/constants";
import { Game } from "../../../types";
import axios from "axios";
import iconSearch from "../../../assets/search.svg";
import trashIcon from "../../../assets/trash-x-filled.svg";
import sendIcon from "../../../assets/send.svg";
import editIcon from "../../../assets/edit.svg";
import styles from "./DashboardProducts.module.css";

export const DashboardProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProductState, setNewProductState] = useState(true);
  const [newProductName, setNewProductName] = useState("");
  const [newProductRating, setNewProductRating] = useState("");
  const [newProductGenre, setNewProductGenre] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [newSearch, setNewSearch] = useState<Game[]>([]);

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

  const handleProductGenreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductGenre(event.target.value);
  };

  const handleProductPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductPrice(event.target.value);
  };

  const handleProductDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProductDescription(event.target.value);
  };

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

    const productsData = {
      emailAdmin: emailAdmin,
      secret: admin?.secret,
      id,
      name: newProductName,
      background_image,
      rating: newProductRating,
      playtime,
      price: newProductPrice,
      description: newProductDescription,
      released,
      state: newProductState,
      genres: newProductGenre,
      images,
    };

    const config = {
      url: EDIT_PRODUCT,
      productsData,
    };
    await axios.post(config.url, config.productsData);
  };

  const handlerSearch = () => {
    const searchedProduct = listProducts.filter((product) =>
      product.name.toLowerCase().includes(searchProducts.toLowerCase())
    );
    setNewSearch(searchedProduct);
  };

  const handleClear = () => {
    setNewSearch([]);
  };

  return (
    <>
      <div className={styles.nav}>
        <DashboardNav />
      </div>
      <section
        className={
          showModal
            ? styles["product-container-blur"]
            : styles["product-container"]
        }
      >
        <h3>Products</h3>
        <div className={styles["head-products"]}>
          <input
            type="text"
            value={searchProducts}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchProducts(event.target.value)
            }
          />
          <div className={styles["button-search"]}>
            <button onClick={() => handlerSearch()}>
              <img src={iconSearch} />
            </button>
            <button onClick={handleClear}>
              <img src={trashIcon} />
            </button>{" "}
          </div>
        </div>
        <div className={styles["product-info"]}>
          <p>id</p>
          <p>name</p>
          <p>rating</p>
          <p>price</p>
          <p>state</p>
        </div>
        {newSearch.length === 0
          ? listProducts.map(
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
                  <div className={styles["button-changes"]}>
                    <img
                      className={styles["edit-button"]}
                      src={editIcon}
                      onClick={() => setShowModal(true)}
                    />
                    <button className={styles["send-changes"]}
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
                    <img
                      src={sendIcon}
                      className={styles["send-changes"]}
                      alt=""
                    />
                    </button>
                  </div>
                </div>
              )
            )
          : newSearch.map(
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
                  <img
                    className={styles["edit-button"]}
                    src={editIcon}
                    onClick={() => setShowModal(true)}
                  />
                  <button
                  className={styles["send-changes"]}
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
                    <img
                      src={sendIcon}
                      className={styles["send-changes"]}
                      alt=""
                    />
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
            value={newProductDescription}
            onChange={handleProductDescriptionChange}
          />
          <label htmlFor="productGenres">Genres: </label>
          <input
            type="text"
            id="productGenres"
            name="productGenres"
            value={newProductGenre}
            placeholder="insert genres with coma"
            onChange={handleProductGenreChange}
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
