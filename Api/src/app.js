const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');//**esto siver para los CORS */
const mainRouter = require("./routes/index");
const app=express();  //**Este es nuestro servidor */

//**.use : cuando recibas una request que pase por aca */
//**Middlewares a usar: Son funciones que se encargan de hacer algo con la request y continua */
app.use(morgan("dev"));
app.use(express.json()); //**traduce de json a js object */

app.name = 'API';

app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//** EndPoints Peticiones */

app.use(mainRouter);

// Error catching endware. Manejo de errores
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = app;