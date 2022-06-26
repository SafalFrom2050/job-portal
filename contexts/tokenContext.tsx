import * as React from "react"
import {Token, TokenContextType} from "../@types/token"
import {useContext, useEffect} from "react";
import Router from 'next/router';
import {AlertContext} from "./alertContext";
import {AlertContextType} from "../@types/alert";
import {ALERT_TYPE_WARNING} from "../constants";


export const TokenContext = React.createContext<TokenContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const TokenProvider: React.FC<Props> = ({children}) => {
    const [token, setToken] = React.useState<Token>({
        access: null,
        refresh: null
    });

    const {setAlert} = useContext(AlertContext) as AlertContextType;

    function saveToken(token: Token) {
        setToken(token)
        if (token.access != null){
            localStorage.setItem("accessToken", token.access)
        }
    }


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")

        if (accessToken == null || accessToken == '') {
            setAlert({
                type: ALERT_TYPE_WARNING,
                title: "You are not logged in!",
                message: "Please login to access more features",
                action: () => {
                    Router.replace('/login')
                },
                actionButtonText: 'Login',
                duration: 8000
            })
        }
        setToken({access: accessToken, refresh: null})
        console.log(accessToken)

    }, []);


    return <TokenContext.Provider value={{token, saveToken}}>{children}</TokenContext.Provider>
}