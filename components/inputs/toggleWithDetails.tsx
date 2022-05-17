import React from 'react';
import Spinner from "../common/spinner";

function ToggleWithDetails(props: {
    title?: string,
    description?: string,

    name: string,
    id?: string,
    defaultChecked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: boolean,
    errorMsg?: string | false | undefined,
    loading?: boolean,
    disabled?: boolean
}) {
    return (
        <div
            className="relative shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
            {props.loading &&
                <div className={"absolute w-6 h-6 top-6 right-6"}>
                    <Spinner/>
                </div>
            }

            <div>
                <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pb-3">{props.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">{props.description}</p>
                <div className="w-12 h-6 cursor-pointer rounded-full relative shadow-sm">
                    <input disabled={props.disabled || props.loading} defaultChecked={props.defaultChecked}
                           onChange={props.onChange} type="checkbox" name={props.name} id={props.id || props.name}
                           className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"/>
                    <label htmlFor={props.id || props.name}
                           className="toggle-label bg-gray-200 block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"/>
                </div>
            </div>
            <style>{`
            .checkbox:checked {
                /* Apply class right-0*/
                right: 0;
            }
            .checkbox:checked + .toggle-label {
                /* Apply class bg-indigo-700 */
                background-color: #4c51bf;
            }
            .checkbox:disabled + .toggle-label {
                /* Apply class bg-indigo-700 */
                background-color: #444444;
            }
            
            `}</style>
        </div>
    )
}

export default ToggleWithDetails;