const { getAllProducts, getProductById, getProductsByName,getOrderList } = require("../controllers/products/productsControllers");

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
        const { typeOrder,direction } = req.query;
        if(!direction || !typeOrder) throw new Error ('please, add query with type order:"ASC" or "DESC". too add "typeOrder":"alphabetic","price"');
        
        if(typeOrder === 'name'){
            const orderList = await getOrderList(typeOrder,direction);
            if(orderList.error) throw new Error(orderList.error);
            return res.status(200).json(orderList);
        };
        if(typeOrder === 'price'){
            const orderList = await getOrderList(typeOrder,direction);
            if(orderList.error) throw new Error(orderList.error);
            return res.status(200).json(orderList);
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};


module.exports = { productsList, productID, productOrder };