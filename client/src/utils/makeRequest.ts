import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const makeRequest = async (url: string, options?: any) => {
  try {
    const res = await api(url, options);
    return res.data;
  } catch (error) {
    return error;
  }
};
