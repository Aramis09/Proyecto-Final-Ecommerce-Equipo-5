import { useEffect, useState } from "react";
import { PRUEBA } from "../../prueba";
import styles from "./Carousel.module.css";

export const Carousel = () => {
  const sliceItems = PRUEBA.slice(0, 3);
  const [currentImage, setCurrentImage] = useState(0);

  const handleChangeImage = () => {
    setCurrentImage(
      currentImage === sliceItems.length - 1 ? 0 : currentImage + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleChangeImage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className={styles["carousel-container"]}>
        {sliceItems.map((item, index) => {
          return (
            <div key={index} className={styles["card-carousel"]}>
              <div className={styles["img-carousel"]}>
                {currentImage === index ? (
                  <img src={item.background_image} alt={item.name} />
                ) : null}
              </div>
              <div className={styles["description-carousel"]}>
                {currentImage === index ? (
                  <>
                    <div className={styles.description}>
                      <h2>{item.name}</h2>
                      {item.description}
                      <button>Go</button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>
      <div className={styles["carousel-buttons--change"]}>
        <button onClick={handleChangeImage}>←</button>
        <button onClick={handleChangeImage}>→</button>
      </div>
    </>
  );
};
