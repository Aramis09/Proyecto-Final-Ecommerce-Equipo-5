import axios from 'axios';

const getAllProductComments = async (productId) => {
  const productComments = await axios.get(
    `https://games-store-v.netlify.app/user/commentProduct?productId=${productId}`
  ); //productComments.data => [ {Comment: '' , date, id , productId, userId}, {…}, {…}, … ]
  setAllComments(productComments.data);
};

const postComment = async (e, email, productId, userComment) => {
  e.preventDefault();
  const data = {
    email,
    productId,
    comment: userComment,
  };
  ////console.log()("estoy en el front y soy la data", data);

  try {
    await axios({
      method: "post",
      url: "https://games-store-v.netlify.app/user/newComment",
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

export default {getAllProductComments, postComment};