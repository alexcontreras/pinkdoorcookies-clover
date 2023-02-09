import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import React, { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  return <Component {...pageProps} />
}
