const {Purchase} = require("../../db");
const { arrayIncludesPurchase } = require('./utils');

const getAllPurchaseds = async ()=>{
    let purchasedsAll = await Purchase.findAll({
        where:{state:true},
        include:arrayIncludesPurchase
    });
    return purchasedsAll;
};

const getPurchasedsById = async (id) =>{
    if (!id) throw Error("Error: Debe existir un valor ID, ID=null..!");
    try {
        const purchasedsFound = await Purchase.findAll({
            where:{UserEmail:id, state:true},
            include:arrayIncludesPurchase
        });
        if (!purchasedsFound) throw Error(`Error: No se encontraron Transacciones de Compra con ID=${id}..!!`);
        return purchasedsFound;
    } catch (error) {
        throw Error(error.message)
    };
};

const purchaseTransactionCreate = async (dateTransaction,priceUnit,specialDiscount,priceUnitNet,serialOfGame,numberPayment,giftGame,userEmailGift,ProductId,UserEmail) => {
    try {
        let purchaseCreate = await Purchase.create({dateTransaction,priceUnit,specialDiscount,priceUnitNet,serialOfGame,numberPayment,giftGame,userEmailGift,ProductId,UserEmail});
        if (!purchaseCreate) throw Error(`Error: No se pudo Crear la Transaccion de Compra ${numberPayment}..!!`);
        return purchaseCreate;
    } catch (error) {
        throw Error(error.message);
    };
};

module.exports = {getAllPurchaseds, getPurchasedsById, purchaseTransactionCreate};