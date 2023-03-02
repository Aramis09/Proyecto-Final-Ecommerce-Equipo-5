const { getAllProducts, getProductById, findProducts } = require("../controllers/productsControllers")

const getProductsHandler = async (req,res)=>{
    const {name}=req.query;
    let products ={};
    try {
        if (name){
            products = await findProducts(name);
        }else{
            products = await getAllProducts()
        };
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const getProductByIdHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await getProductById(parseInt(id));
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = { getProductsHandler, getProductByIdHandler }