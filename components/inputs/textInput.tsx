import React from 'react'
import {upperFirst} from 'lodash'
import {overrideTailwindClasses} from "tailwind-override"

function TextInput(props: {
    type: string,
    name: string,
    placeholder?: string,
    label?: string,
    id?: string,
    iClass?: string,
    cClass?: string,
    lClass?: string,
    children?: React.ReactNode,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    error?: boolean,
    errorMsg?: string| false | undefined
}) {

    return (
        <>
            {props.label &&
                <label htmlFor={props.label}
                       className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                    {upperFirst(props.label)}
                </label>
            }
            <div className={`${props.cClass}`}>
                <input
                    name={props.name}
                    id={props.id && ""}
                    aria-labelledby={props.label && ""}
                    type={props.type}
                    className={overrideTailwindClasses(`bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2 ${props.iClass} ${props.error? "bg-red-50 border-red-400" : ""}`)}
                    placeholder={props.placeholder && ""}
                    onChange={props.onChange}
                    value={props.value}
                />
                {props.children}
            </div>

            {props.errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {props.errorMsg}
                </p>
            }
        </>
    );
}

export default TextInput;