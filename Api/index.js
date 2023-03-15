const app = require("./src/app");
const { sequelize } = require("./src/db");
const PORT = process.env.PORT || 3001; //volver a 3001

sequelize.sync({force:true})
.then(() => {
    app.listen(PORT, () => {
    console.log("Back listening on " + PORT); // eslint-disable-line no-console
        });
    })
    .catch((err) => console.log(err.message));