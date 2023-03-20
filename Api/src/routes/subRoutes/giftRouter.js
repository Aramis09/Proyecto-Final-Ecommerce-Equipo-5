const {Router}=require("express");
const { newGift,giftsReceived,giftsSentForMe } = require("../../handlers/giftHandlers");

const giftRouter = Router();

giftRouter.post('/newGift',newGift);
giftRouter.get('/giftsReceived',giftsReceived);
giftRouter.get('/giftsSent',giftsSentForMe);


module.exports = giftRouter;