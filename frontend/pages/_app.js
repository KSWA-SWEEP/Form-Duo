import Layout from '../components/common/Layout'
import '../styles/globals.css'
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
    <Layout>
      <Component {...pageProps}/>
    </Layout>
    </RecoilRoot>
  )
}
