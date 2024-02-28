import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const backPath = "https://image.tmdb.org/t/p/w500";
export const orignalPath = "https://image.tmdb.org/t/p/original";
export const getAll = async (time = "day") => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/all/${time}?api_key=${apiKey}`
  );

  return data.results;
};

export const getDetails = async (type, id) => {
  const res = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${apiKey}`);

  return res.data;
};

export const getCast = async (type, id) => {
  const res = await axios.get(
    `${BASE_URL}/${type}/${id}/credits?api_key=${apiKey}`
  );

  return res.data;
};

export const getMovies = async (page, sortBy) => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${apiKey}&page=${page}&sort=${sortBy}`
  );

  return res.data;
};

export const getTv = async (page, sortBy) => {
  const res = await axios.get(
    `${BASE_URL}/discover/tv?api_key=${apiKey}&page=${page}&sort=${sortBy}`
  );

  return res.data;
};


export const searchAll =  async (query)=>{
  const res = await axios.get(
    `${BASE_URL}/search/multi?api_key=${apiKey}&query=${query}`
  );
  return res.data;
}