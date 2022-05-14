import React, {Dispatch, useEffect, useState} from "react";
import {ALERT_TYPE_DANGER, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING, ALERT_TYPES} from "../../constants";
import {Alert} from "../../@types/alert";
import {CheckCircleOutline, EmojiSadOutline, InformationCircleOutline} from "heroicons-react";


const SideAlert = (props: { alert: Alert }) => {
    const [flag, setFlag] = useState(false)

    function getAlertType(alertType: number) {
        return Object.values(ALERT_TYPES).find((v) => v.type == alertType)
    }

    const alertType = getAlertType(props.alert.type)

    useEffect(() => {
        const duration = props.alert.duration
        if (!duration) return

        const timeout = setTimeout(() => {
            setFlag(false)
        }, duration - 500)

        return () => clearTimeout(timeout)
    }, [props.alert.duration]);

    useEffect(() => {
        setFlag(true)
    }, []);


    return (
        <div>
            {/* Code block starts */}
            <div
                className=" z-30 flex items-center justify-center fixed bottom-20 left-4 right-4 md:bottom-8 md:left-auto">
                <div id="alert"
                     className={`transition duration-500 ease-in-out w-11/12 mx-auto py-3 px-4 dark:bg-gray-800 bg-white md:flex items-center justify-between shadow rounded ${flag ? 'translate-show' : 'translate-hide'} `}>
                    <div className="sm:flex sm:items-start lg:items-center">
                        <div className="flex items-center gap-x-2">
                            <div
                                className={`mr-2 ${alertType?.type == 0 ? "text-lime-500" : alertType?.type == 1 ? "text-yellow-400" : alertType?.type == 2 ? "text-red-500" : "text-white"}`}>

                                {alertType?.type == ALERT_TYPE_SUCCESS && <>
                                    <CheckCircleOutline className={"w-6 h-6"} />
                                </>
                                }

                                {alertType?.type == ALERT_TYPE_WARNING && <>
                                    <InformationCircleOutline className={"w-6 h-6"} />
                                </>
                                }
                                {alertType?.type == ALERT_TYPE_DANGER && <>
                                    <EmojiSadOutline className={"w-6 h-6"} />
                                </>
                                }

                            </div>
                            <p className="mr-2  text-base font-bold text-gray-800 dark:text-gray-100">{props.alert.title}</p>
                        </div>
                        {props.alert.message &&
                            <>
                                <div
                                    className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block"/>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 pt-2 sm:pt-0 pb-2 sm:pb-0">{props.alert.message}</p>
                            </>
                        }
                    </div>
                    <div className="flex items-center justify-end sm:mt-4 md:mt-0">
                        {props.alert.action &&
                            <>
                                <button
                                    onClick={props.alert.action}
                                    className="ml-4 focus:outline-none mr-8 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">{props.alert.actionButtonText}
                                </button>
                            </>
                        }

                        <div onClick={() => setFlag(false)} className="cursor-pointer text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-x">
                                <line x1={18} y1={6} x2={6} y2={18}/>
                                <line x1={6} y1={6} x2={18} y2={18}/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .translate-show{
                    transform : translateX(0%);
                }
                .translate-hide{
                    transform : translateX(150%);
                }
                `}
            </style>
        </div>
    );
};
export default SideAlert;
