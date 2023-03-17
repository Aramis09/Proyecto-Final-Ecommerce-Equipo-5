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

const Comments = () => {
  //Estado Global
  const game: any = useAppSelector((state) => state.productReducer.details);
  const { user } = useAuth0();

  //Estados locales
  const [userComment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const dispatch = useAppDispatch();
  let listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );

  const sendCommentHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("soy el tipo de evento de event", event.type);
    event.preventDefault();
    postComment(game, userComment, user).then((newCommentObject: any) => {
      setAllComments(newCommentObject);
    });
  };

  //const searchImage = listUsersData.map((user) => user);

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
        <form
          className={styles["form-comment"]}
          onSubmit={(event) => {
            sendCommentHandler(event);
          }}
        >
          <textarea
            name="comment"
            placeholder="Your Comment..."
            className={styles["input-comment"]}
            onChange={(e) => setComment(e.target.value)}
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
              </div>
            </div>
            <div className={styles["comment-info"]}>
              <div>
                <img src={commentIcon} alt="" />
                <div>{commentObject.comment}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Comments;
