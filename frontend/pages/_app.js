import Layout from '../components/common/Layout'
import '../styles/globals.css'
import axios from 'axios';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import {getCookie} from "cookies-next";
import Head from 'next/head';

axios.defaults.mode = "cors";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    withCredentials: true,
    'Content-Type': "application/json"
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>폼듀(Form Duo)</title>
      </Head>
      <RecoilRoot>
          {/*<SessionProvider session={session}>*/}
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
          {/*</SessionProvider>*/}
      </RecoilRoot>
    </>
  )
}
