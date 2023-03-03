import { useState } from "react";
import { PRUEBA } from "../../prueba";
import styles from "./DetailCarousel.module.scss";

export const DetailCarousel = () => {
  const game = PRUEBA.slice(1, 2);
  const imageLinks = game[0].images;
  const [currentImage, setCurrentImage] = useState(0);

  const handleChangeImageNext = () => {
    setCurrentImage(
      currentImage === imageLinks.length - 1 ? 0 : currentImage + 1
    );
  };

  const handleChangeImagePrev = () => {
    setCurrentImage(
      currentImage === 0 ? imageLinks.length - 1 : currentImage - 1
    );
  };

  return (
    <section className={styles["carousel-container"]}>
      <button onClick={handleChangeImagePrev}>←</button>
      {imageLinks.map((image, index) => (
        <div
          key={index}
          className={`${styles["carousel-img"]} ${
            currentImage === index ? styles["active-img"] : ""
          }`}
        >
          <img src={image} alt={`Game screenshot ${index + 1}`} />
        </div>
      ))}
      <button onClick={handleChangeImageNext}>→</button>
    </section>
  );
};