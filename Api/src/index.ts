import {app} from './app';
import { sequelizeDB, DB_PORT } from './db';
console.log(DB_PORT);
app.listen(DB_PORT,()=>{
    sequelizeDB.sync({alter:true});
    console.log("Listening on: http://localhost:"+DB_PORT)
})