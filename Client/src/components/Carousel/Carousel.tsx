import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { carouselPicks } from "../../redux/reducer/sliceOne";
import styles from "./Carousel.module.css";

export const Carousel = () => {
  const dispatch = useAppDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  var carouselData = useAppSelector((state) => state.reducerOne.carouselData);
  var intervalId: any;
  
  const handleChangeImage = () => {
    setCurrentImage(
      currentImage === carouselData.length - 1 ? 0 : currentImage + 1
    );
  };
  

  useEffect(() => {
    dispatch(carouselPicks())
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    intervalId = setInterval(handleChangeImage, 5000);
  }, [carouselData])

  
  console.log(carouselData)
  return (
    <>
      <section className={styles["carousel-container"]}>
        {
          carouselData.length> 0 &&
          carouselData.map((item: any, index: number) => {
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
          })
        }
      </section>
      <div className={styles["carousel-buttons--change"]}>
        <button onClick={handleChangeImage}>←</button>
        <button onClick={handleChangeImage}>→</button>
      </div>
    </>
  );
};
