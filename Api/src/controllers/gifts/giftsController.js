const { User,Gift,Purchase } = require("../../db");


const sendGiftToFrend = async (idProduct,emailFriend,emailUser) => {
    try {
        const user = await User.findByPk(emailUser);
        const friend = await User.findByPk(emailFriend); //no anda, tengo que ver porque no anda, no se agrega los regalos
        const friendHasProduct = await Purchase.findAll({
            where:{
                ProductId:idProduct,
                UserEmail:emailFriend,
        }});
        if(friendHasProduct.length) return "Your friend Has Product, yo do not gift the product";
        await user.addGifts(friend, {
            through: { model: Gift, idProduct:idProduct},
        });
        const giftsListThatSent = await getGiftSentToFriend(emailUser);
        return giftsListThatSent;
      } catch (error) {
        return { error: error.message };
      };
};

const getGiftReceived = async (emailUser) => {
    const listGiftReceived = await Gift.findAll({
        where:{
            GiftEmail: emailUser
        }
    });
    return listGiftReceived;
};

const getGiftSentToFriend = async (emailUser) => {
    const listGiftSentForMe = await Gift.findAll({
        where:{
            UserEmail: emailUser
        }
    });
    return listGiftSentForMe;
};

module.exports = {
    sendGiftToFrend,
    getGiftReceived,
    getGiftSentToFriend
};