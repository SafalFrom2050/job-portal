import * as React from "react"
import {useContext, useEffect, useState} from "react"
import {TokenContextType} from "../@types/token"
import {AuthContextType, User} from "../@types/user";
import {TokenContext} from "./tokenContext";
import {AxiosContext} from "./axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import {getCurrentUser} from "../API/auth.api";


export const AuthContext = React.createContext<AuthContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = React.useState<User>({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {token} = useContext(TokenContext) as TokenContextType;

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    function saveUser(user: User) {
        setUser(user)
        setIsLoggedIn(true)
    }

    useEffect(() => {
        // TODO: Check authentication status and save user but redirect if unsuccessful

        if (axiosInstance){
            getCurrentUser(axiosInstance).then((v)=>{
                saveUser(v?.data)
            })
        }

    }, [axiosInstance]);


    return <AuthContext.Provider value={{user, isLoggedIn}}>{children}</AuthContext.Provider>
}