const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); //**esto siver para los CORS */
const mainRouter = require("./routes/index");
const app = express(); //**Este es nuestro servidor */
const { auth } = require("express-openid-connect");

// const {
//   AUTH_REQUIRED,
//   AUTH0LOGOUT,
//   SECRET,
//   BASE_URL,
//   CLIENT_ID,
//   ISSUER_BASE_URL,
// } = process.env;

// const config = {
//   AUTH_REQUIRED,
//   AUTH0LOGOUT,
//   SECRET,
//   BASE_URL,
//   CLIENT_ID,
//   ISSUER_BASE_URL,
// };

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'K1WxZJeGyTg75TOD5gxBXVZZ6DG9EsyV',
  issuerBaseURL: 'https://henryfinalproject.us.auth0.com',
  secret: 'rBQlxo8TBg96u6W3dtE5SAAoH9io0-nK_7FEMRLbrxJvT8HrzkHjkJ1DGUN0qNkF'
};

//**.use : cuando recibas una request que pase por aca */
//**Middlewares a usar: Son funciones que se encargan de hacer algo con la request y continua */
app.use(morgan("dev"));
app.use(express.json()); //**traduce de json a js object */
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//** EndPoints Peticiones */

app.use(auth(config));

app.use(mainRouter);

// Error catching endware. Manejo de errores
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
