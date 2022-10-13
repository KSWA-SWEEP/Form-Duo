import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//token 값 수정 필요
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZXVuaG8iLCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjY1NTgyMzg5LCJleHAiOjE2NjYxODcxODl9.l8CVKBpchq4WdO9A-aaSg-cGAkjtw2kuuKF71qg1wTlpbRy1Yg4OE9uLcZttEsfQ9-mczWXqCY9LKsC_7zQuVQ";

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
