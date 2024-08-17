import '@/app/globals.css'
import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

interface MyAppProps extends AppProps {}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>SalonPlaces</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
