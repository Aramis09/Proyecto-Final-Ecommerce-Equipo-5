"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeDB = exports.DB_PORT = void 0;
const sequelize_1 = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
exports.DB_PORT = process.env.DB_PORT;
exports.sequelizeDB = new sequelize_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf`, { logging: false });
