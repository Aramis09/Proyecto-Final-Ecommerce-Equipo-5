import { useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Comment } from '../../types'
import { getAllProductComments, postComment } from '../../Handlers/comments';



const Comments = () => {
  //Estado Global
  const game: any = useAppSelector((state) => state.productReducer.details);

  //Estados locales
  const [userComment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  //Para enviar por body
  const { user } = useAuth0();
  const email = user?.email;
  const productId = game.id;



    useEffect(() => {
      getAllProductComments();
    }, []); //hay que pasarle algo para que cuando se haga un comentario aparezca

  return (
    <>
      <div className="create-comment-container">
        <h3>Form to leave a Comment...</h3>
        <form onSubmit={postComment(e, email, productId, userComment)}>
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
          allComments.map((c: Comment) => (
            <>
              <div>User: {c.userId}</div>
              <div>Comment: {c.Comment}</div>
            </>
          ))}
      </div>
    </>
  );
};

export default Comments;
