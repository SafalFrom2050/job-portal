import * as React from "react"
import {Token, TokenContextType} from "../@types/token"
import {useContext, useEffect} from "react";
import {AlertContext} from "./alertContext";
import {AlertContextType} from "../@types/alert";


export const TokenContext = React.createContext<TokenContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const TokenProvider: React.FC<Props> = ({children}) => {
    const [token, setToken] = React.useState(undefined as undefined | Token);

    const {setAlert} = useContext(AlertContext) as AlertContextType;

    function saveToken(token: Token) {
        setToken(token)
        if (token.access != null){
            localStorage.setItem("accessToken", token.access)
        }
    }


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")

        setToken({access: accessToken, refresh: null})
        console.log(accessToken)

    }, []);

    if (token === undefined) return <></>

    return <TokenContext.Provider value={{token, saveToken}}>{children}</TokenContext.Provider>
}