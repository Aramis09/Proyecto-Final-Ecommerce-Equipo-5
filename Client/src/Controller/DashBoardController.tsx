import { LIST_SALES } from "../utils/constants";
import axios from "axios";
export const getPurchaseList = async () => {
    const salesList =( await axios(LIST_SALES)).data;
    return salesList;
};