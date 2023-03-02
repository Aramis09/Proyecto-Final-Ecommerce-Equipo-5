import axios from "axios";
import { GamesData } from "./types";

export let Games: GamesData[] = [];

axios
  .get("https://apisgames-production.up.railway.app/products")
  .then((response) => {
    console.log(response.data);
    Games = response.data;
  })
  .catch((error) => {
    console.log(error);
  });
