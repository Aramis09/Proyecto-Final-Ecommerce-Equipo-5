import axios from "axios";
import { Game } from "./types";

export let allGames: Game[] = [];

if (allGames.length === 0) {
  try {
    const response = await axios.get<Game[]>("http://localhost:3001/products/");
    allGames = response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}
