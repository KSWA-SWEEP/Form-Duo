import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// axios.defaults.baseURL = apiUrl;
axios.defaults.baseURL = 'http://210.109.60.247:10001';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
