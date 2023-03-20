const {Product, Platform, Image, Genre, Store,Purchase,User} = require("../../db");
const axios = require("axios");
const {getAllPurchaseds} = require("../purchase/purchaseTransactionController");
const { arrayStoresDet, arrayGenresDet, arrayPlatformsDet, arrayPlatforms, arrayGenres, arrayStores, arrayImagesDet, arrayIncludes} = require('./utils');
const { Op } = require("sequelize");

const getAllProducts = async ()=>{
    let productsListWithMoreTrash = await Product.findAll({
        include:arrayIncludes
    });
    let productsListWithTrash=await productsListWithMoreTrash.map(productWithTrash => productWithTrash.dataValues);
    if (!productsListWithTrash.length){
        console.log("Entro a Carga Inicial");
        await loadProductsInDB();
        let productsListWithMoreTrash = await Product.findAll({
            include:arrayIncludes
        });
        let productsListWithTrash=await productsListWithMoreTrash.map(productWithTrash => productWithTrash.dataValues);
        let productListClean = cleaningProcess(await productsListWithTrash);
        return productListClean;
    };
    let productListClean = cleaningProcess( await productsListWithTrash);
    return productListClean;
};

const getProductById = async id =>{
    if (!id) throw Error("Error: Debe existir un valor ID, ID=null..!");
    try {
        const productWithTrash = await Product.findOne({
            where:{id:Number(id), state:true},
            include:arrayIncludes
        });
        if (!productWithTrash) throw Error(`Error: ID=${id} no encontrado..!!`);
        const productClean = cleaningProcessToOneProduct(productWithTrash);
        return productClean;
    } catch (error) {
        throw Error(error.message)
    };
};

const getProductsByPlatform = async (arrayPlatforms) => {
    try {
        let productsListWithMoreTrash = await Product.findAll({
            include:[
            {
                model:Platform,
                attributes:["name"],
                where:{ id:arrayPlatforms},
                through: { attributes: [] },
            },
            {
                model: Image,
                attributes: ["image_path"],
            },
            {
                model: Genre,
                attributes: ["name"],
                through: { attributes: [] },
            },
            {
                model: Store,
                attributes: ["name"],
                through: { attributes: [] },
            },
            ],
        });
        let productsListWithTrash=await productsListWithMoreTrash.map(productWithTrash => productWithTrash.dataValues);
        let productListClean = cleaningProcess( await productsListWithTrash);
        return productListClean;
    } catch (error) {
        return error.message;
    };
};

const getProductsByCategory = async (name,filters,order) => {
    const arrayOrder=[]
    if (order.alphabetic) arrayOrder.push(["name",order.alphabetic])
    if (order.price) arrayOrder.push(["price",order.price])
    try {
        let productsListWithMoreTrash = await Product.findAll({
            where:{
                name:{
                    [Op.iLike]:`%${name}%`,
                },
                price:{
                    [Op.gte]:filters.priceRange[0],
                    [Op.lte]:filters.priceRange[1],
                },
            },
            order:arrayOrder,
            include:[
            {
                model:Platform,
                attributes:["name"],
                where: filters.platform.length>0 ? { id:filters.platform}: null,
                through: { attributes: [] },
            },
            {
                model: Image,
                attributes: ["image_path"],
            },
            {
                model: Genre,
                attributes: ["name"],
                where: filters.genres.length>0 ? { id:filters.genres} : null,
                through: { attributes: [] },
            },
            {
                model: Store,
                attributes: ["name"],
                through: { attributes: [] },
            },
            ],

        });
        let productsListWithTrash=await productsListWithMoreTrash.map(productWithTrash => productWithTrash.dataValues);
        let productListClean = cleaningProcess( await productsListWithTrash);
        return productListClean;
    } catch (error) {
        return error.message;
    };
};


const getProductsByName = async nameForSeach => {
    try {
        const listOfProducts = await getAllProducts();
        let hightCoincidences = []; //Almacena los juegos que tienen alta coincidencia con el name pasado
        let lowCoincidences = [];   //Almacena los juegos que tienen baja coincidencia con el name pasado
        listOfProducts.forEach(productDb => {
            let productNameArray = productDb.name.toLowerCase().split(',').join('').split(' ');
            const productNameForSerachArray = nameForSeach.toLowerCase().split(',').join('').split(' ');
            let coincidences = 0;
            for(const wordPosition in productNameForSerachArray){
                if(productNameArray.includes(productNameForSerachArray[wordPosition])) {
                  coincidences++//////////////////////////////
                }
            }
            if(coincidences >= 2) hightCoincidences.push(productDb);//
            else if(coincidences) lowCoincidences.push(productDb);//
        });
        const allProductsMatchByName = [...hightCoincidences,...lowCoincidences];
        if(!allProductsMatchByName.length)  throw new Error({error:'Cannot found game with the entry name'}); 
        return allProductsMatchByName;
    } catch (error) {
        return error.message;
    };
};

const getOrderAlphabeticalList = async orderType =>{
    const productList = await getAllProducts();
    console.log(orderType)
    if(orderType === 'az'){
        let orderedList =  productList.sort(alphabeticalOrderAZ);
        return orderedList;
    };
    let orderedList =  productList.sort(alphabeticalOrderZA);
        return orderedList;
};

const getListProductsBuy = async email => {
    const purchases = await getAllPurchaseds();
    const products = await purchases.map(property => {
        return property.Product;
    });
    return products;
};
///////LOGIC/////////LOGIC/////////LOGIC/////////LOGIC/////////LOGIC//////////////////////LOGIC/////////
async function cleaningProcess(productListWithTrash){
        let productListClean = [];
        productListWithTrash.forEach(productWithTrash => {
            const productClean = cleaningProcessToOneProduct(productWithTrash);
            productListClean.push(productClean); 
    });
    return productListClean;
};

function cleaningProcessToOneProduct (productWithTrash) {
    propertyCleanImages = productWithTrash.Images.map(propertyTrash => propertyTrash.image_path);
    propertyCleanplatform = productWithTrash.Platforms.map(propertyTrash => propertyTrash.name) ;
    propertyCleanGenres = productWithTrash.Genres.map(propertyTrash => propertyTrash.name);
    propertyCleanStores = productWithTrash.Stores.map(propertyTrash => propertyTrash.name);
    const { id,name, background_image,rating,playtime,price,description,released, state } = productWithTrash;
    const productClean = {id,name, background_image,rating,playtime,price,description,released, state} ;
    productClean.images = propertyCleanImages;
    productClean.platforms = propertyCleanplatform;
    productClean.genres = propertyCleanGenres;
    productClean.stores = propertyCleanStores;
    productClean.state = state;
    return productClean;
};

async function loadProductsInDB (){
    try {
        const dataOK = await getDataRestProducts();
        await Promise.all(
            dataOK.map(async (element)=>{
                await Product.create(element);
            })
            );
            await Promise.all(
                arrayPlatforms.map(async (element)=>{
                    const arrayProducts = await arrayPlatformsDet.filter(e => e.PlatformId === element.id).map(d => d.ProductId);
                    await createPlatform(element,arrayProducts);
                })
        );
        await Promise.all(
            arrayGenres.map(async (element)=>{
                const arrayProducts = await arrayGenresDet.filter(e => e.GenreId === element.id).map(d => d.ProductId);
                await createGenre(element,arrayProducts);
            })
            );
            await Promise.all(
                arrayStores.map(async (element)=>{
                    const arrayProducts = await arrayStoresDet.filter(e => e.StoreId === element.id).map(d => d.ProductId);
                    await createStore(element,arrayProducts);
                })
                );
                await Promise.all(
                    arrayImagesDet.map(async (element)=>{
                        await Image.create(element);
                    })
                    );
                    
                } catch (error) {
                    console.log(error.message);
                };
};       
async function createPlatform (platform, products)  {
    const newPlatform = await Platform.create(platform);
    await newPlatform.addProduct(products);
    return newPlatform;
};
async function createGenre (genre, products)  {
    const newGenre = await Genre.create(genre);
    await newGenre.addProduct(products);
    return newGenre;
};
async function createStore (store, products) {
    const newStore = await Store.create(store);
    await newStore.addProduct(products);
    return newStore;
};  
async function getDataRestProducts () {
    try {
        let data = (await axios.get(`https://apisgames-production.up.railway.app/products`)).data;
        let dataRequerida = await data.map((c) => {
            if (c.platforms.length > 0){
                c.platforms.forEach(element=>{
                    const valueFound = arrayPlatforms.find(e=>e.name===element)
                    if (!valueFound){
                        const newLength = arrayPlatforms.push({id:arrayPlatforms.length+1, name:element});
                        arrayPlatformsDet.push({ProductId:c.id, PlatformId:newLength});
                    }else{
                        arrayPlatformsDet.push({ProductId:c.id, PlatformId:valueFound.id});
                    }
                })
            };
            if (c.genres.length > 0){
                c.genres.forEach(element=>{
                    const valueFound = arrayGenres.find(e=>e.name===element)
                    if (!valueFound){
                        const newLength = arrayGenres.push({id:arrayGenres.length+1, name:element});
                        arrayGenresDet.push({ProductId:c.id, GenreId:newLength});
                    }else{
                        arrayGenresDet.push({ProductId:c.id, GenreId:valueFound.id});
                    }
                })
            };
            if (c.stores.length > 0){
                c.stores.forEach(element=>{
                    const valueFound = arrayStores.find(e=>e.name===element)
                    if (!valueFound){
                        const newLength = arrayStores.push({id:arrayStores.length+1, name:element});
                        arrayStoresDet.push({ProductId:c.id, StoreId:newLength});
                    }else{
                        arrayStoresDet.push({ProductId:c.id, StoreId:valueFound.id});
                    }
                })
            };
            if (c.images.length > 0){
                c.images.forEach(element=>{
                    arrayImagesDet.push({ProductId:c.id, id:arrayImagesDet.length+1, image_path:element});
                })
            };
            let reg = {
                id: c.id,
                name: c.name,
                background_image: c.background_image,
                rating: parseFloat(c.rating),
                playtime: parseInt(c.playtime),
                price: isNaN(parseFloat(c.price)) ? 0.00 : parseFloat(c.price),
                description: c.description,
                released:c.released
            };
            return reg;
        });
        return dataRequerida;
    } catch (error) {
        console.log(error.message);
    }
}
function alphabeticalOrderAZ(a,b){
    let frst = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    if( frst === second) return 0;
    if( frst > second ) return 1;
     if( frst < second) return -1;
};

function alphabeticalOrderZA(a,b){
    let frst = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    if( frst === second) return 0;
    if( frst > second ) return -1;
     if( frst < second) return 1;
};
module.exports = {getAllProducts, getProductById, getProductsByName, getOrderAlphabeticalList, getProductsByPlatform, getProductsByCategory,getListProductsBuy};