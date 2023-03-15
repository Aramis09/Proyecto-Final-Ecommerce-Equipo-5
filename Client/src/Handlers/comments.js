const getAllProductComments = async (productId) => {
  const productComments = await axios.get(
    `http://localhost:3001/user/commentProduct?productId=${productId}`
  ); //productComments.data => [ {Comment: '' , date, id , productId, userId}, {…}, {…}, … ]
  //console.log(new Date(), "productComments: ", productComments.data);
  setAllComments(productComments.data);
  //console.log("allComments", new Date(), allComments);
};

const postComment = async (e, email, productId, userComment) => {
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

export default {getAllProductComments, postComment};