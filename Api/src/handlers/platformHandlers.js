const { getAllPlatforms, getPlatformById, getPlatformsByName} = require("../controllers/platforms/platformsControllers");
 
const platformsList = async (req,res)=>{
    const { name }= req.query;
    let platforms ={};
    try {
        if (name){
            platforms = await getPlatformsByName(name);
        }else{
            platforms = await getAllPlatforms();
        };
        res.status(200).json(platforms);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

const platformID = async (req,res) => {
    const { id } = req.params;
    try {
        const platformFound = await getPlatformById(parseInt(id));
        res.status(201).json(platformFound);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
};


module.exports = { platformsList, platformID };