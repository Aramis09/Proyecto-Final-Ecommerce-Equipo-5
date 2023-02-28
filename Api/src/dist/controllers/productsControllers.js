"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const cleanArray = (arr) => {
    const clean = arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            background_image: elem.background_image,
            rating: elem.rating,
            playtime: elem.playtime,
            price: elem.price,
            created: false,
        };
    });
    return clean;
};
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiUsersRaw = (yield axios_1.default.get(`https://apisgames-production.up.railway.app/products`)).data;
    const apiUsers = cleanArray(apiUsersRaw);
    return apiUsers;
});
exports.getAllProducts = getAllProducts;
