import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {TokenProvider} from "../contexts/tokenContext";
import {AxiosProvider} from "../contexts/axiosContext";
import Header from "../components/navigation/header";
import BottomNav from "../components/navigation/bottomNav";
import Footer from "../components/navigation/footer";
import {AuthProvider} from "../contexts/authContext";
import {AlertProvider} from "../contexts/alertContext";

const queryClient = new QueryClient()


function MyApp({Component, pageProps}: AppProps) {

    return (
        <AlertProvider>
            <TokenProvider>
                <AxiosProvider>
                    <AuthProvider>
                        <QueryClientProvider client={queryClient}>

                            <>
                                <Header/>

                                {/* Only in Mobile */}
                                <BottomNav/>
                                <div className={"min-h-screen"}>
                                    <Component {...pageProps} />
                                </div>
                                <Footer/>
                            </>
                        </QueryClientProvider>
                    </AuthProvider>
                </AxiosProvider>
            </TokenProvider>
        </AlertProvider>

    )
}

export default MyApp
