import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";

function ToggleCheckbox(props: {
    name: string,
    id?: string,
    defaultChecked: boolean,
    label?: string,
    lClass?: string,
    error?: string
}) {
    return (
        <div className="flex flex-col items-start gap-4 py-3">
            {/* Code block starts */}

            {props.label &&
                <label htmlFor={props.label}
                       className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                    {upperFirst(props.label)}
                </label>
            }

            <div className="cursor-pointer rounded-full bg-indigo-700 relative shadow-sm">
                <input defaultChecked={props.defaultChecked} type="checkbox" name="toggle" id="toggle2"
                       className="focus:outline-none checkbox w-6 h-6 rounded-full bg-gray-200 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"/>
                <label htmlFor="toggle2"
                       className="toggle-label dark:bg-gray-700 block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer"/>
            </div>
            {/* Code block ends */}


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