import React, {Dispatch} from "react";


export type Alert = {
    type: number,
    title: string,
    message?: string,
    duration?: number,
    action?: (e: React.MouseEvent<HTMLElement>) => void,
    actionButtonText?: string
}

export interface AlertContextType {
    setAlert: Dispatch<Alert>,
    alert?: Alert
}