"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./db");
console.log(db_1.DB_PORT);
app_1.app.listen(db_1.DB_PORT, () => {
    db_1.sequelizeDB.sync({ alter: true });
    console.log("Listening on: http://localhost:" + db_1.DB_PORT);
});
