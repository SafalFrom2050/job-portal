import {InformationCircle} from "heroicons-react";
import React from "react";

export function FormErrorMessage(props: { errorMsg: boolean | string }) {
    return <div className="flex items-center gap-x-2 p-2 mb-2 text-xs text-red-600 border border-red-600 bg-red-50">
        <InformationCircle className="w-4 h-4"/>
        <div dangerouslySetInnerHTML={{__html: String(props.errorMsg)}}></div>
    </div>;
}