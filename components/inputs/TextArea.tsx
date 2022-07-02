import React from 'react'
import {upperFirst} from 'lodash'
import {overrideTailwindClasses} from "tailwind-override"

function TextArea(props: {
    name: string,
    placeholder?: string,
    label?: string,
    id?: string,
    iClass?: string,
    cClass?: string,
    lClass?: string,
    children?: React.ReactNode,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value?: string,
    error?: boolean,
    errorMsg?: string| false | undefined,
    required?: boolean,
    leftLabel?: string,
    rightLabel? :string
}) {

    return (
        <div className={"flex flex-col"}>
            {props.label &&
                <label htmlFor={props.name}
                       className={overrideTailwindClasses(`py-3 font-medium leading-none text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                    {upperFirst(props.label)}

                    <span className="text-red-500">{props.required ? "*" : ""}</span>
                </label>
            }
            <div className={`flex items-end gap-2 ${props.cClass}`}>
                {props.leftLabel &&
                    <label htmlFor={props.name}
                           className={overrideTailwindClasses(`my-2 font-medium leading-none text-sm text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                        {upperFirst(props.leftLabel)}

                        <span className="text-red-500">{props.required ? "*" : ""}</span>
                    </label>
                }
                {/*<input*/}
                {/*    name={props.name}*/}
                {/*    id={props.id && ""}*/}
                {/*    aria-labelledby={props.label || ""}*/}
                {/*    className={overrideTailwindClasses(`bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-400 placeholder:text-sm text-gray-800 py-2 w-full pl-3 ${props.iClass} ${props.error? "bg-red-50 border-red-400" : ""}`)}*/}
                {/*    placeholder={props.placeholder || ""}*/}
                {/*    onChange={props.onChange}*/}
                {/*    value={props.value}*/}
                {/*/>*/}
                <textarea
                    className={overrideTailwindClasses(`bg-gray-200 h-[170px] border rounded text-sm font-normal placeholder-gray-400 placeholder:text-sm text-gray-800 py-2 w-full pl-3 ${props.iClass} ${props.error? "bg-red-50 border-red-400" : ""}`)}
                    // className="resize-none w-full h-[170px] px-4 py-4 text-base outline-none text-slate-600 border border-1 rounded"
                    placeholder={props.placeholder || " "}
                    defaultValue={props.value}
                    onChange={props.onChange}
                />


                {props.rightLabel &&
                    <label htmlFor={props.name}
                           className={overrideTailwindClasses(`my-2 font-medium leading-none text-sm text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                        {upperFirst(props.rightLabel)}

                        <span className="text-red-500">{props.required ? "*" : ""}</span>
                    </label>
                }
                {props.children}
            </div>

            {props.errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {props.errorMsg}
                </p>
            }
        </div>
    );
}

export default TextArea;