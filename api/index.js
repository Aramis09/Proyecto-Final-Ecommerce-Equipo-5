const app = require("./src/app");
const {sequelize, DB_PORT} = require("./src/db");

app.listen(DB_PORT,()=>{
    sequelize.sync({force:true});
    console.log("Listening on: http://localhost:3001")
})

