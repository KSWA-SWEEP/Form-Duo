import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//token 값 수정 필요
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJramhAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NTU3OTkzMSwiZXhwIjoxNjY1NTgxNzMxfQ.YfYUJqZPUOqtWB8yysudtoxnG5tpM69Nok6ebPgzEleHO_Re5o83q37UgsC3qRR2qIT4HXFxBvv_kJ_qjMuleQ";

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
