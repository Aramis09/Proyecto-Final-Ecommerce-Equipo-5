const { getAllProducts, getProductById } = require("../controllers/productsControllers")

const getProductsHandler = async (req,res)=>{
    const results = await getAllProducts();
    res.status(201).json(results);
}

const getProductHandler = async(req,res)=>{
    const {id} = req.params;
    console.log('id',id);
    try {
        const product = await getProductById(parseInt(id));
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = { getProductsHandler, getProductHandler }