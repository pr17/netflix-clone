import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const movie_base_url = "https://image.tmdb.org/t/p/original/";
export default axiosInstance;
