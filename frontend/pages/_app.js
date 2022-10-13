import Layout from '../components/common/Layout'
import '../styles/globals.css'
import * as Sentry from "@sentry/nextjs"
import { Integrations } from '@sentry/nextjs'
import axios from 'axios';
import { SessionProvider } from "next-auth/react"

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import {accToken} from "../atoms/accToken";
import {refToken} from "../atoms/refToken";

// console.log(process.env.NEXT_PUBLIC_API_URL);
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//token 값 수정 필요
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmdXJ5QHRlc3QuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NTY2MjY1MywiZXhwIjoxNjY1ODQyNjUzfQ.wfM8s1J7rMjFWKQzMluThfUHqNsF_OVQhFeGmFisU4xKNQuVZWlOObNOnumxHxdg0g7anMdNEfwRYewzywVBHQ";
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
      <RecoilRoot>
          <SessionProvider session={session}>
                  <Layout>
                  <Component {...pageProps} />
                  </Layout>
          </SessionProvider>
      </RecoilRoot>
  )
}
