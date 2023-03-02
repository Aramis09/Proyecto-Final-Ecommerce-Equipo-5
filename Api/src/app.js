const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes/index");
const app = express();  //**Este es nuestro servidor */

//**.use : cuando recibas una request que pase por aca */
//**Middlewares a usar: Son funciones que se encargan de hacer algo con la request y continua */
app.use(morgan("dev"));
app.use(express.json()); //**traduce de json a js object */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
//** EndPoints Peticiones */

app.use(mainRouter);

module.exports = app;