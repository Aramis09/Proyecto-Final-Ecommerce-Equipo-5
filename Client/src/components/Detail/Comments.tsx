import { useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

const Comments = () => {
  const game: any = useAppSelector((state) => state.productReducer.details);
  const [userComment, setComment] = useState("");
  const { user } = useAuth0();
  const email = user?.email;
  const productId = game.id;
  //mandar por query email, coment y el productId
  const commentHandler = async (e: any) => {
    e.preventDefault()
    const data = {
      email,
      productId,
      comment:userComment
    };
    console.log('estoy en el front y soy la data',data)
    
    try {
      
      await axios({
        method: 'post',
        url: 'http://localhost:3001/user/newComment',
        data
      });
    } catch (error: any) {
      const date = new Date()
      console.log('soy el error del axios',error.response, 'horario del error', date)
    }
    
  };
  
  return (
    <>
      <h3>Form to leave a Comment...</h3>
      <form onSubmit={commentHandler}>
        <label>Comment: </label>
        <input
          type="text"
          name="comment"
          // value={comment}
          onChange={(e) => setComment(e.target.value)}
          ></input>
        <button type="submit">Send comment.</button>
      </form>
    </>
  );
};


export default Comments;



  // axios.get(`http://localhost:3001/user/newComment?email=${email}&productId=${product}&comment=${comment}`);