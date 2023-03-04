import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import styles from "./Carousel.module.scss";

export const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  let carouselData = useAppSelector((state) => state.productReducer.carouselData);

  const handleChangeImage = () => {
    setCurrentImage(
      currentImage === carouselData.length - 1 ? 0 : currentImage + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleChangeImage, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className={styles["carousel-container"]}>
        {carouselData.map((item, index) => {
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
