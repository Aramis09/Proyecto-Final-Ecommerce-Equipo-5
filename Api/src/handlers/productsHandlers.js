const { getAllProducts, getProductById, findProducts } = require("../controllers/productsControllers")

const getProducts = async (req,res)=>{
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

const getProduct = async(req,res)=>{
    const {id} = req.params;
    console.log('id',id);
    try {
        const product = await getProductById(parseInt(id));
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = { getProducts, getProduct }