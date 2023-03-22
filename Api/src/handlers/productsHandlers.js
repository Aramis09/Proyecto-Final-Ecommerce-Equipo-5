const { checkProductInDb, getAllProducts, getProductById, getProductsByName, getOrderAlphabeticalList, getProductsByPlatform, getProductsByCategory,getListProductsBuy } = require("../controllers/products/productsControllers");

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

const productsListByPlatforms = async (req,res)=>{
    const { arrayPlatforms }= req.body;
    try {
        let products = await getProductsByPlatform(arrayPlatforms);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const productsListByCategory = async (req,res)=>{
    const { pageNumber } = req.query;
    const { name, filters, order }= req.body;
    try {
        let products = await getProductsByCategory(name, filters, order,pageNumber);
        //console.log('back', products)
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};
const productsBuyList =  async (req,res)=>{
    const { email }= req.query;
    try {
        let products = await getListProductsBuy(email);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const checkIfProductWasBought =  async (req,res)=>{
    const { email,idProduct }= req.query;
    try {
        let response = await checkProductInDb(email,idProduct);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};


module.exports = {checkIfProductWasBought, productsList, productID, productOrder, productsListByPlatforms, productsListByCategory,productsBuyList };