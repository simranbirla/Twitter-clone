import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const makeRequest = async (
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const res = await api(url, options);
    return res.data;
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
};
