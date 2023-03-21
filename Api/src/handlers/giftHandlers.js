const { sendGiftToFrend,getGiftReceived,getGiftSentToFriend } = require("../controllers/gifts/giftsController");

const newGift = async (req,res) => {
    try {
        const { idProduct,emailFriend,emailUser } = req.body;
        console.log(req.body)
        if(!idProduct || !emailFriend || !emailUser) throw new Error("send me all data");
        const myNewListGiftSendToFriend = await sendGiftToFrend(idProduct,emailFriend,emailUser);
        return res.status(200).json(myNewListGiftSendToFriend);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};


const giftsReceived = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error("send me all data");
        const myListGiftReceived = await getGiftReceived(email);
        return res.status(200).json(myListGiftReceived);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};

const giftsSentForMe = async (req,res) => {
    try {
        const { email } = req.query;
        if(!email) throw new Error("send me all data");
        const myListGiftSentForMe = await getGiftSentToFriend(email);
        return res.status(200).json(myListGiftSentForMe);
    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};

module.exports = {
    newGift,
    giftsReceived,
    giftsSentForMe
};