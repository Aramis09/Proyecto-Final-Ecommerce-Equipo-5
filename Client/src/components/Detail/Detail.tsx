//import { allGames } from "../../get";
import { NavBar } from "../NavBar/NavBar";
import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import { getProductByID } from "../../redux/actions/productAction";
import { eraseItemById } from "../../redux/reducer/productReducer";
import styles from "./Detail.module.scss";

export const Detail = () => {
  //const game = allGames.slice(3, 4);
  const {id} = useParams()
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.productReducer.details)

  useEffect(() => {
    dispatch(getProductByID(parseInt(id)))

    return () => {
      dispatch(eraseItemById())
    }
  }, [])

  console.log(game)

  return (
    <>
      <NavBar />
      <div>
        {
          game.name &&
          <div>
            <section className={styles["background-image"]}>
              <img src={game.background_image} alt={game.name} />
            </section>      
            <section className={styles["info-container"]}>
              <div className={styles["left-section"]}>
                <div key={game.id}>
                  <h3>{game.name}</h3>
                  <p>${game.price}</p>
                  <Rating value={game.rating} />
                </div>
              </div>
              <div className={styles["right-section"]}>
              <div>
                <p>{game.description}</p>
                <div className={styles["right-section-info"]} >
                  <div className={styles["gender-section"]}>
                    <h4>Generos</h4>
                    <div className={styles["button-container"]}>
                      {
                        
                        game.genres.map((item, index) => (
                          <button key={index}>{item}</button>
                        ))
                        
                      }
                    </div>
                  </div>
                  <div className={styles["platforms-section"]}>
                    <h4>Plataformas</h4>
                    <div className={styles["button-container"]}>
                      {
                        
                        game.platforms.slice(0, 3).map((item, index) => (
                          <button key={index}>{item}</button>
                        ))
                        
                      }
                  </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
            <DetailCarousel images={game.images}/>
          </div>
        
        }

      </div>
    </>
  );
};
