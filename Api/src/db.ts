//**Crea la conexion con la base de datos (con sequelize) */
import { Sequelize } from "sequelize";
require("dotenv").config(); //**La variables de entorno quedan dispobnibles .env */
const {DB_USER, DB_PASSWORD, DB_HOST}= process.env;
export const {DB_PORT}= process.env;
export const sequelizeDB = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf`,{logging:false});

//**Definicion de modelos (con sequelize)*/


/**Instancias que definen los modelos, crea el .models: */

//**Relacionar los Modelos */


//**Exportarla para poder trabajar con los modelos en los controllers */
