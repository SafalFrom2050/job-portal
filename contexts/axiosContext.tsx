import * as React from "react"
import {TokenContextType} from "../@types/token"
import {AxiosContextType} from "../@types/axiosInstance";
import axios from "axios";
import {useContext, useEffect, useRef} from "react";
import {TokenContext} from "./tokenContext";
import {BASE_URL} from "../others/config";
import Router from "next/router";


export const AxiosContext = React.createContext<AxiosContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const AxiosProvider: React.FC<Props> = ({children}) => {
    const {token} = useContext(TokenContext) as TokenContextType;

    if (token.access == null || token.access == ""){
        return <AxiosContext.Provider value={{axiosInstance: null}}>{children}</AxiosContext.Provider>
    }

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token.access}`,
        }
    })

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status == 401) {
                console.log("heyyyyyyyy")
                await Router.replace('/login')
            }
        }
    )

    return <AxiosContext.Provider value={{axiosInstance}}>{children}</AxiosContext.Provider>
}