import axios from "axios";
import { Comment } from "../types";

export const getAllProductComments = async (game: any) => {
  const productComments = await axios.get(
    `http://localhost:3001/user/commentProduct?productId=${game.id}`
  ); //productComments.data => [ {Comment: '' , date:'', id:number , productId:number, userId}, {…}, {…}, … ]
  const allCommentsObject: Comment = await productComments.data;
  return allCommentsObject;
};

export const postComment = async (
  game: any,
  userComment: string,
  user: any,
  stars : number,
) => {
  //Para enviar por body
  const email = user?.email;
  const image = user?.picture
  
  const data = {
    email,
    productId: game.id,
    comment: userComment,
    date: String(new Date()).slice(0,21),
    image,
    stars,
  };

  await axios({
    method: "post",
    url: "https://games-store-v.netlify.app/user/newComment",
    data,
  });
  const newCommentObject = await getAllProductComments(game);
  return newCommentObject;
};
