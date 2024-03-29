import * as React from "react"
import {useContext, useEffect, useRef, useState} from "react"
import {TokenContextType} from "../@types/token"
import {AxiosContextType} from "../@types/axiosContextType";
import axios, {AxiosInstance, AxiosPromise} from "axios";
import {TokenContext} from "./tokenContext";
import {BASE_URL} from "../others/config";
import Router from "next/router";
import {AlertContext} from "./alertContext";
import {AlertContextType} from "../@types/alert";
import {ALERT_TYPE_DANGER, ALERT_TYPE_WARNING} from "../constants";


export const AxiosContext = React.createContext<AxiosContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

type AxiosInstanceRef = null | AxiosInstance


export const AxiosProvider: React.FC<Props> = ({children}) => {
    const {token} = useContext(TokenContext) as TokenContextType;
    const {setAlert} = useContext(AlertContext) as AlertContextType;

    const [isLoaded, setIsLoaded] = useState(false)

    let axiosInstance = useRef(null as AxiosInstanceRef)
    const axiosInstanceGuest = useRef(null as AxiosInstanceRef)


    function reRender() {
        console.log("Axios instance changed! Re-rendering...")
        setIsLoaded(true)
    }

    useEffect(() => {

        if (token === undefined) return

        axiosInstance.current = axios.create({
            baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.access}`,
            }
        })

        if (!axiosInstance) return
        axiosInstance.current.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response.status == 401) {
                    setAlert({
                        type: ALERT_TYPE_WARNING,
                        title: "You are not logged in!",
                        message: "Please login to access more features",
                        action: () => {
                            Router.replace('/login')
                        },
                        actionButtonText: 'Login',
                    })

                } else if (error.response.status == 500) {
                    setAlert({
                        type: ALERT_TYPE_DANGER,
                        title: "The server has encountered an issue and could not process your request.",
                        duration: 5000
                    })
                } else if (error.response.status == 403) {
                    if (Router.pathname !== '/verify')
                        setAlert({
                            type: ALERT_TYPE_WARNING,
                            title: "Verify your account to continue.",
                            message: "Please click on the verification link that has been sent to your email address to verify your account.",
                            duration: 20000,
                        })
                }
                throw error
            }
        )
        reRender()
    }, [token.access]);

    useEffect(() => {
        axiosInstanceGuest.current = axios.create({
            baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
            }
        })
    }, []);


    if (!isLoaded) return <></>

    return <AxiosContext.Provider value={{
        axiosInstance: axiosInstance.current,
        axiosInstanceGuest: axiosInstanceGuest.current
    }}>{children}</AxiosContext.Provider>
}