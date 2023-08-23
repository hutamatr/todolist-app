import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  withCredentials: true,
});
