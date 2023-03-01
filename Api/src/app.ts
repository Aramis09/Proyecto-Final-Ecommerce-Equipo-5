import express from 'express';
import morgan from 'morgan';
import {mainRouter} from './routes/index'
export const app=express();

//**.use : cuando recibas una request que pase por aca */
//**Middlewares a usar: Son funciones que se encargan de hacer algo con la request y continua */
app.use(morgan("dev"));
app.use(express.json()); //**traduce de json a js object */

//** EndPoints Peticiones */

app.use(mainRouter);

