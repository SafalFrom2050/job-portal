import * as React from "react"
import {Token, TokenContextType} from "../@types/token"
import {useContext, useEffect, useState} from "react";
import Router from 'next/router';
import {AuthContextType, User} from "../@types/user";
import {TokenContext} from "./tokenContext";
import {AxiosContext} from "./axiosContext";
import {AxiosContextType} from "../@types/axiosInstance";


export const AuthContext = React.createContext<AuthContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = React.useState<User>({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {token} = useContext(TokenContext) as TokenContextType;

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    // TODO: Check authentication status and save user but redirect if unsuccessful
    axiosInstance?.get('user')

    function saveUser(user: User) {
        setUser(user)
        setIsLoggedIn(true)
    }

    return <AuthContext.Provider value={{user, isLoggedIn}}>{children}</AuthContext.Provider>
}