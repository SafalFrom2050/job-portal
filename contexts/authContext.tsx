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
        // Checks authentication status and saves user but redirects if unsuccessful
        if (axiosInstance){
            getCurrentUser(axiosInstance).then((v)=>{
                saveUser(v?.data)
            })
        }

    }, [axiosInstance]);

    function syncUser() {
        if (axiosInstance){
            getCurrentUser(axiosInstance).then((v)=>{
                saveUser(v?.data)
            })
        }
    }


    return <AuthContext.Provider value={{user, isLoggedIn, syncUser}}>{children}</AuthContext.Provider>
}