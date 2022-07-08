import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";

function ToggleCheckbox(props: {
    name: string,
    id?: string,
    defaultChecked: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: boolean,
    errorMsg?: string| false | undefined,
    label?: string,
    lClass?: string,
    cClass?: string
}) {

    return (
        <div className={overrideTailwindClasses(`flex flex-col items-start gap-4 py-3 ` + props.cClass)}>
            {/* Code block starts */}

            {props.label &&
                <label htmlFor={props.name}
                       className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                    {upperFirst(props.label)}
                </label>
            }

            <div className="w-12 h-6 cursor-pointer rounded-full relative shadow-sm">
                <input defaultChecked={props.defaultChecked} onChange={props.onChange} type="checkbox" name={props.name} id={props.id || props.name}
                       className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"/>

                <label htmlFor={props.id || props.name}
                       className="toggle-label bg-gray-200 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"/>
            </div>
            {/* Code block ends */}


            {props.errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {props.errorMsg}
                </p>
            }

            <style>
                {`.checkbox:checked {
                        /* Apply class right-0*/
                        right: 0;
                    }
                    .checkbox:checked + .toggle-label {
                        /* Apply class bg-indigo-700 */
                        background-color: #4c51bf;
                    }`}
            </style>
        </div>
    );
}

export default ToggleCheckbox;