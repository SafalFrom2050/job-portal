import * as React from "react"
import {Token, TokenContextType} from "../@types/token"


export const TokenContext = React.createContext<TokenContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const TokenProvider: React.FC<Props> = ({children}) => {
    const [token, setToken] = React.useState<Token>({
        access: null,
        refresh: null
    });

    return <TokenContext.Provider value={{token, setToken}}>{children}</TokenContext.Provider>
}