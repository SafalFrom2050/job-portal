import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {TokenProvider} from "../contexts/tokenContext";
import {AxiosProvider} from "../contexts/axiosContext";
import Header from "../components/navigation/header";
import BottomNav from "../components/common/bottomNav";

const queryClient = new QueryClient()


function MyApp({Component, pageProps}: AppProps) {
    return (
        <TokenProvider>
            <AxiosProvider>
                <QueryClientProvider client={queryClient}>
                    <>
                        <Header />

                        {/* Only in Mobile */}
                        <BottomNav/>
                        <Component {...pageProps} />

                    </>
                </QueryClientProvider>
            </AxiosProvider>
        </TokenProvider>
    )
}

export default MyApp
