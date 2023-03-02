const { getAllProducts, getProductById, getProductsByName,getOrderAlphabeticalList } = require("../controllers/products/productsControllers");

const productsList = async (req,res)=>{
    const { name }= req.query;
    let products ={};
    try {
        if (name){
            products = await getProductsByName(name);
        }else{
            products = await getAllProducts();
        };
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const productID = async (req,res) => {
    const { id } = req.params;
    try {
        const productFound = await getProductById(parseInt(id));
        res.status(201).json(productFound);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const productOrder = async (req,res) =>{
    try {
        const { typeOrder } = req.query;
        const typeOrderMin = typeOrder.toLowerCase();
        if(typeOrderMin === 'az') {
            const orderListAZ = await getOrderAlphabeticalList(typeOrderMin);
            return res.status(200).json(orderListAZ);
        }
        const orderListAZ = await getOrderAlphabeticalList(typeOrderMin);
        return res.status(200).json(orderListAZ);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = { productsList, productID, productOrder };