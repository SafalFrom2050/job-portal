import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function WhiteButton(props: { name: string, class?: string, onClick?: () => void }) {
    return (
        <button
            onClick={props.onClick}
            className={overrideTailwindClasses(`mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-xs ${props.class}`)}>{props.name}</button>
    );
}

export default WhiteButton;