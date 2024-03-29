import * as React from "react"
import {useContext, useEffect, useState} from "react"
import {AuthContextType, User} from "../@types/user";
import {AxiosContext} from "./axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import {getCurrentUser} from "../API/auth.api";
import Router, {useRouter} from "next/router";
import {ALERT_TYPE_WARNING, authOnlyRoutes, organizationOnlyRoutes} from "../constants";
import {AlertContext} from "./alertContext";
import {AlertContextType} from "../@types/alert";
import {ScreenLoading} from "../components/common/screenLoading";


export const AuthContext = React.createContext<AuthContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({children}) => {
    const {pathname} = useRouter()

    const [user, setUser] = React.useState<User>({});
    const [isLoggedIn, setIsLoggedIn] = useState(undefined as undefined | boolean);

    const {setAlert} = useContext(AlertContext) as AlertContextType;


    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    useEffect(() => {
        // Checks authentication status and saves user but redirects if unsuccessful
        syncUser()

    }, [axiosInstance]);

    useEffect(() => {
        if (isLoggedIn !== undefined && !isLoggedIn){
            authOnlyRoutes.map((route) => {
                if (pathname.startsWith('/' + route)) {
                    Router.back()
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
            })
        }

        if (isLoggedIn && user && !user.is_organization) {
            organizationOnlyRoutes.map((route) => {
                if (pathname.startsWith('/' + route)) {
                    Router.back()
                    setAlert({
                        type: ALERT_TYPE_WARNING,
                        title: "Only organization can access this page!",
                        message: "Please change your account type to 'Organization' for access",
                        action: () => {
                            Router.replace('/account')
                        },
                        actionButtonText: 'Account',
                        duration: 8000
                    })
                }
            })
        }

    }, [isLoggedIn, pathname]);


    function saveUser(user: User) {
        setUser(user)
        if (user) setIsLoggedIn(true)
    }

    function syncUser() {
        if (axiosInstance) {
            getCurrentUser(axiosInstance).then((v) => {

                if (v.status === 200){
                    saveUser(v?.data)
                }else {
                    setIsLoggedIn(false)
                    setUser({})
                }
            })
        }else {
            setIsLoggedIn(false)
            setUser({})
        }
    }

    if (!isLoggedIn){
        authOnlyRoutes.map((route) => {
            if (pathname.startsWith('/' + route)) {
                return <></>
            }
        })
    }

    if (isLoggedIn && user && !user.is_organization) {
        organizationOnlyRoutes.map((route) => {
            if (pathname.startsWith('/' + route)) {
                return <></>
            }
        })
    }

    if (isLoggedIn === undefined) return <ScreenLoading />



    return <AuthContext.Provider value={{user, isLoggedIn, syncUser}}>{children}</AuthContext.Provider>
}