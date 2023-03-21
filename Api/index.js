const app = require("./src/app");
const {sequelize} = require("./src/db");
const { addUserAdmin } = require("./src/controllers/users/userController");
const PORT = process.env.PORT || 3001; //volver a 3001

sequelize.sync({force: false})
.then(() => {
    app.listen(Number(PORT), () => {
        console.log("Back listening on http://localhost:"+PORT); // eslint-disable-line no-console
        addUserAdmin("apphenry2023@gmail.com", "Admin", "https://lh3.googleusercontent.com/a/AGNmyxYk7bJ_PnhzQBC-miRsBTjljO2e6YFKfYssBjz5=s96-c");
    });
})
.catch((err)=>console.log(err.message));