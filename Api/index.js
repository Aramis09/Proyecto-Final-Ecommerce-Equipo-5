const app = require("./src/app");
const {sequelize} = require("./src/db");
const PORT= process.env.PORT;

sequelize.sync({force:true})
.then(() => {
    app.listen(Number(PORT), () => {
    console.log("Back listening on http://localhost:"+PORT); // eslint-disable-line no-console
        });
    })
.catch((err)=>console.log(err.message));
