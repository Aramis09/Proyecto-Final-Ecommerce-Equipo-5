const app = require("./src/app");
const {sequelize} = require("./src/db");
const PORT = process.env.PORT || 3001; //volver a 3001

sequelize.sync({force: false})
.then(() => {
    app.listen(Number(PORT), () => {
    console.log("Back listening on http://localhost:"+PORT); // eslint-disable-line no-console
        });
    })
.catch((err)=>(err.message));