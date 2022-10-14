import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//token 값 수정 필요
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmNkZUBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjY1NTg5NTE4LCJleHAiOjE2NjU3Njk1MTh9.9aIlp14cpQ95Am3LrPuYpTV98OmFgx4d20HYkqLKU1exwTxgxndf7_Oibq-Fyve7U680WWfwokyx-WEOn93WMA";

axios.defaults.headers = {
    'Content-Type': "application/json",
    "Authorization": "Bearer " + token,
};
axios.defaults.mode = "cors";
axios.defaults.withCredentials = true;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
