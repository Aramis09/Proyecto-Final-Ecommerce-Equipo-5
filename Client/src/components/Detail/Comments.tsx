import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Comment } from "../../types";
import { getListUsers } from "../../redux/actions/userAction";
import {
  postComment,
  getAllProductComments,
} from "../../Controller/commentController";
import commentIcon from "../../assets/message-2.svg";
import styles from "./Comments.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Rating, RatingChangeEvent } from "primereact/rating";

const Comments = () => {
  //Estado Global
  const game: any = useAppSelector((state) => state.productReducer.details);
  const { user } = useAuth0();

  //Estados locales
  const [userComment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [stars, setStars] = useState<number>(0);

  const dispatch = useAppDispatch();

  const sendCommentHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postComment(game, userComment, user, stars).then((newCommentObject: any) => {
      setAllComments(newCommentObject);
      setComment("");
    });
  };

  useEffect(() => {
    getAllProductComments(game).then((allCommentsObject: any) =>
      setAllComments(allCommentsObject)
    );
    dispatch(getListUsers());
  }, []); //hay que pasarle algo para que cuando se haga un comentario aparezca

  return (
    <>
      <div className={styles["comment-container"]}>
        <h3>Leave a Comment...</h3>
        <div className="card flex justify-content-center">
          <Rating
            value={stars}
            onChange={(e: any) => setStars(e.value)}
            cancel={false}
          />
        </div>

        <form className={styles["form-comment"]} onSubmit={sendCommentHandler}>
          <textarea
            name="comment"
            placeholder={
              !user ? "Log in to leave a comment" : "Your Comment..."
            }
            className={styles["input-comment"]}
            onChange={(e) => setComment(e.target.value)}
            value={userComment}
          />

          <button type="submit" className={styles["button-comment"]}>
            <img src={commentIcon} alt="" />
          </button>
        </form>
      </div>
      {allComments &&
        allComments.map((commentObject: Comment) => (
          <div className={styles["comment-card"]} key={commentObject.id}>
            <div className={styles["user-info"]}>
              <div>
                <img
                  className={styles["comment-card-img"]}
                  src={commentObject?.image}
                  alt="user image"
                />
              </div>
              <div>
                <div>{commentObject.userId}</div>
                <div>{commentObject.date}</div>
            <Rating value={commentObject.stars || 3} readOnly cancel={false} />
              </div>
            </div>
            <div className={styles["comment-info"]}>
              <img src={commentIcon} alt="" />
              <p>{commentObject.comment}</p>
            </div>

          </div>
        ))}
    </>
  );
};

export default Comments;
