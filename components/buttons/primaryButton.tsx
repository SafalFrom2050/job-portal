import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function PrimaryButton(props: { name: string, cClass?: string, class?: string, onClick?: (e: any) => any }) {
    return (
        <div className={props.cClass}>
        <button
            onClick={props.onClick}
            className={overrideTailwindClasses(`mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs ${props.class}`)}>{props.name}</button>
        </div>
    );
}

export default PrimaryButton;