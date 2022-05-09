import * as React from "react"
import {TokenContextType} from "../@types/token"
import {AxiosContextType} from "../@types/axiosInstance";
import axios from "axios";
import {useContext} from "react";
import {TokenContext} from "./tokenContext";
import {BASE_URL} from "../others/config";


export const AxiosContext = React.createContext<AxiosContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const AxiosProvider: React.FC<Props> = ({children}) => {
    const {token} = useContext(TokenContext) as TokenContextType;

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token.access}`,
        }
    })

    return <AxiosContext.Provider value={{axiosInstance}}>{children}</AxiosContext.Provider>
}