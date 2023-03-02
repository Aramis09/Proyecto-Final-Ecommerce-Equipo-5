const app = require("./src/app");
const {sequelize} = require("./src/db");

const PORT = process.env.PORT || 3001; //volver a 3001

app.listen(PORT,()=>{
    sequelize.sync({force:true}); //volver a true
    console.log(`Listening on: http://localhost:${PORT}`);
});