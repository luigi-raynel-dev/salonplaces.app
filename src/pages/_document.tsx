import { TopBar } from '@/components/layout/TopBar'
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
