import "@/styles/fonts.css"
import "@/styles/styles.css"

import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
