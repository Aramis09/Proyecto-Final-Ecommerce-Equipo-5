const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes/index");
const app=express();  //**Este es nuestro servidor */

//**.use : cuando recibas una request que pase por aca */
//**Middlewares a usar: Son funciones que se encargan de hacer algo con la request y continua */
app.use(morgan("dev"));
app.use(express.json()); //**traduce de json a js object */

//** EndPoints Peticiones */

app.use(mainRouter);

module.exports = app;