const { getAllPurchaseds, getPurchasedsById, purchaseTransactionCreate } = require("../controllers/purchase/purchaseTransactionController");

const purchaseList = async (req,res)=>{
    let purchaseds ={};
    try {
        purchaseds = await getAllPurchaseds();
        res.status(200).json(purchaseds);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const purchaseByUserID = async (req,res) => {
    const { id } = req.params;
    try {
        const purchasedFound = await getPurchasedsById(id);
        res.status(201).json(purchasedFound);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const purchaseCreate = async (req,res) =>{
    try {
        //console.log()('hey')
        ////console.log()(req.body)
        const {dateTransaction,priceUnit,specialDiscount,priceUnitNet,serialOfGame,numberPayment,giftGame,userEmailGift,ProductId,UserEmail} = req.body.transactionDataObject;
        /*
        //console.log()(dateTransaction)
        //console.log()('res: ', dateTransaction,'+',priceUnit,'+',specialDiscount,'+',priceUnitNet,'+',serialOfGame,'+',numberPayment,'+',giftGame,'+',userEmailGift,'+',ProductId,'+',UserEmail)
        */
        let purchaseNew = await purchaseTransactionCreate(dateTransaction,priceUnit,specialDiscount,priceUnitNet,serialOfGame,numberPayment,giftGame,userEmailGift,ProductId,UserEmail)
        return res.status(200).json(purchaseNew);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = { purchaseList, purchaseByUserID, purchaseCreate };