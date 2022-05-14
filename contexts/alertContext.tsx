import React, {useEffect, useState} from 'react';
import {AlertContextType, Alert} from "../@types/alert";
import SideAlert from "../components/alerts/sideAlert";
import {DEFAULT_ALERT_DURATION_MS} from "../constants";


export const AlertContext = React.createContext<AlertContextType | null>(null)

type Props = {
    children?: React.ReactNode
};

type AlertState = Alert | undefined

export const AlertProvider: React.FC<Props> = ({children}) => {
    const [alert, setAlert] = useState(undefined as AlertState);

    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (alert == undefined) return

        const timeout = setTimeout(() => {
            setHiding(true)
            setAlert(undefined)
        }, alert?.duration || DEFAULT_ALERT_DURATION_MS)

        return () => clearTimeout(timeout)

    }, [alert]);

    return <AlertContext.Provider value={{setAlert, alert}}>
        {alert &&
            <SideAlert alert={alert} />
        }
        {children}
    </AlertContext.Provider>
}