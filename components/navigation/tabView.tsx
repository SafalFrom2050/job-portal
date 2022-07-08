import React, {useEffect, useState} from "react";


export type TabList = { key: number, value: string }

const TabView = (props: {
    tabs: TabList[],
    onTabChange?: (key: number) => void,
    heading?: string,
    headingClass?: string,
    defaultTabKey?: number
}) => {
    const [activeStatus, setActiveStatus] = useState(props.defaultTabKey || 0);

    useEffect(() => {
        props.onTabChange?.(activeStatus)
    }, [activeStatus])

    return <div className={"bg-white rounded "}>
        <div className={"max-w-[1000px] mx-auto"}>

            <div className="sm:hidden relative w-full mx-auto rounded">
                <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-selector" width={24}
                         height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="8 9 12 5 16 9"/>
                        <polyline points="16 15 12 19 8 15"/>
                    </svg>
                </div>
                <select
                    aria-label="Selected tab"
                    onChange={(e) => setActiveStatus(Number.parseInt(e.target.value))}
                    className="block w-full p-3 rounded text-gray-600 appearance-none bg-transparent relative z-10 focus:ring-0 focus:ring-offset-0"
                >
                    {props.tabs.map((tab) => {
                        return <option
                            key={tab.key}
                            value={tab.key}
                            selected={activeStatus === tab.key}
                            className="text-sm text-gray-600"
                        >
                            {tab.value}
                        </option>
                    })}
                </select>
            </div>
            <div className="justify-between flex-wrap hidden sm:block">
                <div className="xl:w-full xl:mx-0 h-12">
                    <ul className="flex">
                        {props.tabs.map((tab) => {
                            return <li key={tab.key} onClick={() => setActiveStatus(tab.key)}
                                       className={activeStatus === tab.key ? "text-sm text-indigo-700 flex flex-col justify-between border-indigo-700 pt-3 rounded-t mr-10 font-normal" : "text-sm text-gray-600 py-3 mr-10 font-normal cursor-pointer hover:text-gray-800"}>
                                <span className="mb-3 cursor-pointer">{tab.value}</span>
                                {activeStatus == tab.key && <div className="w-full h-1 bg-indigo-700 rounded-t-md"/>}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>
};
export default TabView;
