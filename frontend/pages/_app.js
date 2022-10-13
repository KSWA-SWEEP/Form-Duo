import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//token 값 수정 필요
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDIyQGVtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2NjU2Mzc3MDEsImV4cCI6MTY2NTgxNzcwMX0.InZ3neTH-FUQwEGlHN30ESC1GGJUK6pZPC2jxH65EBxUpORJtE469dwVDXiN-l-l0D0XsmLSBw4gve9E4LRx2w";

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
