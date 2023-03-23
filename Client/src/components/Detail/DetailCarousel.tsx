import { useState } from "react";
import styles from "./DetailCarousel.module.scss";

export const DetailCarousel = ({ images }:any) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleChangeImageNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const handleChangeImagePrev = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  return (
    <section className={styles["carousel-container"]}>
      <button onClick={handleChangeImagePrev}>←</button>
      {images.map((image:any, index:any) => (
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
