// pages/_app.tsx

import type { AppProps } from 'next/app'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'College API',
    description: 'API for getting all colleges of india.',
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
