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


export const AxiosContext = React.createContext<AxiosContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

type AxiosInstanceRef = null | AxiosInstance


export const AxiosProvider: React.FC<Props> = ({children}) => {
    const {token} = useContext(TokenContext) as TokenContextType;
    const {setAlert} = useContext(AlertContext) as AlertContextType;

    const [toggle, setToggle] = useState(false)

    let axiosInstance = useRef(null as AxiosInstanceRef)

    function reRender() {
        console.log("Axios instance changed! Re-rendering...")
        setToggle((v) => !v)
    }

    useEffect(() => {

        if (token.access == null || token.access == "") return

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
                    setAlert({type: 2, title: "Authentication required!"})

                    await Router.replace('/login')
                }
            }
        )
        reRender()
    }, [token.access]);

    return <AxiosContext.Provider value={{axiosInstance: axiosInstance.current}}>{children}</AxiosContext.Provider>
}