import { PRUEBA } from "../../prueba";
import { allGames } from "../../get";
import { NavBar } from "../NavBar/NavBar";
import { Rating } from "../Rating/Rating";
import styles from "./Detail.module.scss";
import { DetailCarousel } from "./DetailCarousel";

export const Detail = () => {
  const game = allGames.slice(3, 4);

  return (
    <>
      <NavBar />
      <section className={styles["background-image"]}>
        {game.map((item, index) => (
          <img key={index} src={item.background_image} alt={item.name} />
        ))}
      </section>
      <section className={styles["info-container"]}>
        <div className={styles["left-section"]}>
          {game.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <Rating value={item.rating} />
            </div>
          ))}
        </div>
        <div className={styles["right-section"]}>
          {game.map(({ id, description, genres, platforms }, index) => (
            <div key={id}>
              <p>{description}</p>
              <div className={styles["right-section-info"]} key={index}>
                <div className={styles["gender-section"]}>
                  <h4>Generos</h4>
                  <div className={styles["button-container"]}>
                    {genres.map((item, index) => (
                      <button key={index}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className={styles["platforms-section"]} key={index}>
                  <h4>Plataformas</h4>
                  <div className={styles["button-container"]}>
                    {platforms.slice(0, 3).map((item) => (
                      <button>{item}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <DetailCarousel />
    </>
  );
};
