import { useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Comment } from "../../types";

// import { postComment } from "../../Handlers/comments.js";
// import { getAllProductComments} from "../../Handlers/comments.js";

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

  // const formatDate = (string : string) =>{
  //   const format = string.split('T')
  //   console.log('formatDate',format)
  //   return format[0]
  // }

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      email,
      productId,
      comment: userComment,
    };
    //console.log("estoy en el front y soy la data", data);
  
    try {
      await axios({
        method: "post",
        url: "http://localhost:3001/user/newComment",
        data,
      });
      await getAllProductComments();
    } catch (error) {
      console.log(
        "soy el error del axios",
        error.response,
        "horario del error:",
        new Date()
      );
    }
  };

  const getAllProductComments = async () => {
    const productComments = await axios.get(
      `http://localhost:3001/user/commentProduct?productId=${productId}`
    ); //productComments.data => [ {Comment: '' , date, id , productId, userId}, {…}, {…}, … ]
    //console.log(new Date(), "productComments: ", productComments.data);
    setAllComments(productComments.data);
    //console.log("allComments", new Date(), allComments);
  };

  useEffect(() => {
    getAllProductComments();
  }, []); //hay que pasarle algo para que cuando se haga un comentario aparezca

  return (
    <>
      <div className="create-comment-container">
        <h3>Form to leave a Comment...</h3>
        <form onSubmit={postComment}>
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
              {/* <div>Date: {formatDate(c.date)}</div> */}
              <div>Comment: {c.Comment}</div>
            </>
          ))}
      </div>
    </>
  );
};

export default Comments;
