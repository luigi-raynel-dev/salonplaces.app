import { TopBar } from '@/components/TopBar'
import { AppBar, Typography } from '@mui/material'
import { Html, Head, Main, NextScript } from 'next/document'

export default function _document() {
  return (
    <Html>
      <Head></Head>
      <body className="m-0 h-full">
        <TopBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
