const { getAllProducts } = require("../controllers/productsControllers")

const getProductsHandler = async (req,res)=>{
    const results = await getAllProducts();
    res.status(201).json(results);
}

const getProductHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await getProductById(id);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = { getProductsHandler, getProductHandler }