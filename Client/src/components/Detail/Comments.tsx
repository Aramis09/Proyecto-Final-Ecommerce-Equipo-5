import { useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Comment } from "../../types";

import { postComment, getAllProductComments } from "../../Controller/commentController";

const Comments = () => {
  //Estado Global
  const game: any = useAppSelector((state) => state.productReducer.details);
  const { user } = useAuth0();
  //Estados locales
  const [userComment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const sendCommentHandler = (event: any) => {
    console.log("soy el tipo de evento de event", event.type);
    event.preventDefault();
    postComment(game, userComment, user).then((newCommentObject: any) => {
      setAllComments(newCommentObject);
    });
  };

  useEffect(() => {
    getAllProductComments(game).then((allCommentsObject: any) =>
      setAllComments(allCommentsObject)
    );
  }, []); //hay que pasarle algo para que cuando se haga un comentario aparezca

  return (
    <>
      <div className="create-comment-container">
        <h3>Form to leave a Comment...</h3>
        <form
          onSubmit={(event) => {
            sendCommentHandler(event);
          }}
        >
          <label>Comment: </label>
          <input
            type="text"
            name="comment"
            // value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button type="submit">Send comment.</button>
        </form>
      </div>
      <div className="show-comments-container">
        {allComments &&
          allComments.map((commentObject: Comment) => (
            <>
              <div>User: {commentObject.userId}</div>
              <div>Date: {commentObject.date}</div>
              <div>Comment: {commentObject.comment}</div>
            </>
          ))}
      </div>
    </>
  );
};

export default Comments;
