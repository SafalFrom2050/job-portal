import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {TokenProvider} from "../contexts/tokenContext";

const queryClient = new QueryClient()


function MyApp({Component, pageProps}: AppProps) {
    return (
        <TokenProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </TokenProvider>
    )
}

export default MyApp
