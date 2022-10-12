import axios from 'axios';
// import {getCookie} from "cookies-next";

export const customAxios = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL),
  // headers : {
  //   "autorization":getCookie("user_token"),
  // },
  withCredentials : true,
});