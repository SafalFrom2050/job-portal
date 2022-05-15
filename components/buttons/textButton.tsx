import React, {ReactNode} from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function TextButton(props: { name: string, cClass?: string, class?: string, onClick?: (e: any) => any, disabled?: boolean, iconRight?: ReactNode, isSubmitType?: boolean}) {
    return (
        <div className={props.cClass}>
            <button
                type={props.isSubmitType ? "submit" : "button"}
                disabled={props.disabled}
                onClick={props.onClick}
                className={overrideTailwindClasses(`mx-2 my-2 transition duration-150 ease-in-out text-indigo-700 hover:text-indigo-800 text-sm lg:max-w-[200px] flex justify-end items-center gap-3 font-medium ${props.class}`)}>
                {props.name}
                {props.iconRight}
            </button>

        </div>
    );
}

export default TextButton;