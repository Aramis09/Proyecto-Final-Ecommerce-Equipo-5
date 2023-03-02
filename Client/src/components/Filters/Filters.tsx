import { useState } from "react";
import { PRUEBA } from "../../prueba";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import styles from "./Filters.module.css";

const uniqueGenres = [...new Set(PRUEBA.flatMap((option) => option.genres))];
const uniquePlatform = [
  ...new Set(PRUEBA.flatMap((option) => option.platforms)),
];
const optionOrder = ["a-z", "z-a"];

// const getPriceRange = () => {
//   const priceRange = PRUEBA.map((item) => item.price).flat();
//   const minPrice = Math.min(...priceRange.map(Number));
//   const maxPrice = Math.max(...priceRange.map(Number));
//   console.log(minPrice, maxPrice);
// };

export const Filters = () => {
  const [genresOpen, setGenresOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <aside className={styles["filters-container"]}>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (platformsOpen || orderOpen) {
              setPlatformsOpen(false);
              setOrderOpen(false);
              setGenresOpen(!genresOpen);
            } else {
              setGenresOpen(!genresOpen);
            }
          }}
        >
          Generos
        </label>
        <select multiple className={genresOpen ? styles.open : ""}>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (genresOpen || orderOpen) {
              setOrderOpen(false);
              setGenresOpen(false);
              setPlatformsOpen(!platformsOpen);
            } else {
              setPlatformsOpen(!platformsOpen);
            }
          }}
        >
          Plataforma
        </label>
        <select multiple className={platformsOpen ? styles.open : ""}>
          {uniquePlatform.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["options-container"]}>
        <label className={styles["label-tittle"]}>Precio</label>
        <PriceSlider />
      </div>
      <div className={styles["options-container"]}>
        <label
          className={styles["label-tittle"]}
          onClick={() => {
            if (platformsOpen || genresOpen) {
              setPlatformsOpen(false);
              setGenresOpen(false);
              setOrderOpen(!orderOpen);
            } else {
              setOrderOpen(!orderOpen);
            }
          }}
        >
          orden
        </label>
        <select multiple className={orderOpen ? styles.open : ""}>
          {optionOrder.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};
