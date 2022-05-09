import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {TokenProvider} from "../contexts/tokenContext";
import {AxiosProvider} from "../contexts/axiosContext";

const queryClient = new QueryClient()


function MyApp({Component, pageProps}: AppProps) {
    return (
        <TokenProvider>
            <AxiosProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </AxiosProvider>
        </TokenProvider>
    )
}

export default MyApp
