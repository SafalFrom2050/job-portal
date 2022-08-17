import {ChipIcon} from "@heroicons/react/solid";
import React from "react";

export function ScreenLoading() {
    return <div className={"flex items-center justify-center h-screen animate-pulse"}>
        <ChipIcon className={"w-6 h-6 mr-2"}/>
        <p className={"font-extrabold text-gray-700 text-lg"}>LOADING...</p>
    </div>;
}