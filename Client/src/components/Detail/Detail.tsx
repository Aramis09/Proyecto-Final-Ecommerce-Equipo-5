import { useState } from "react";
import { PRUEBA } from "../../prueba";
import { Rating } from "../Rating/Rating";
import styles from "./Detail.module.css";

export const Detail = () => {
  const game = PRUEBA.slice(0, 1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % game[0].images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + game[0].images.length) % game[0].images.length
    );
  };

  return (
    <>
      <section className={styles["background-image"]}>
        {game.map((item, index) => (
          <img key={index} src={item.background_image} alt={item.name} />
        ))}
      </section>
      <section>
        <div>
          {game.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>{item.rating}</p>
              <Rating value={item.rating} />
            </div>
          ))}
        </div>
        <div>
          {game.map((item) => (
            <div key={item.id}>
              <p>{item.description}</p>
              <p>{item.genres}</p>
              <p>{item.platforms}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.carousel}>
        <div className={styles["carousel-container"]}>
          {game[0].images.map((image, index) => (
            <div
              key={index}
              className={
                index === currentSlide
                  ? styles["carousel-slide"] + " " + styles["active-slide"]
                  : styles["carousel-slide"]
              }
            >
              {<img src={image}  />}
            </div>
          ))}
          <button className={styles["carousel-prev"]} onClick={prevSlide}>
            &#10094;
          </button>
          <button className={styles["carousel-next"]} onClick={nextSlide}>
            &#10095;
          </button>
        </div>
        <div className={styles["carousel-indicators"]}>
          {game[0].images.map((image, index) => (
            <span
              key={index}
              className={
                index === currentSlide
                  ? styles["carousel-indicator"] + " " + styles["active-indicator"]
                  : styles["carousel-indicator"]
              }
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>
    </>
  );
};
