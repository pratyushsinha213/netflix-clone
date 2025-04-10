import axios from "axios";
import { TMDB_READ_ACCESS_TOKEN } from "../config/env.js";


export const fetchFromTMDB = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`
    }
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error(`Error fetching data from TMDB: ${response.statusText}`);
  }
  return response.data;
}