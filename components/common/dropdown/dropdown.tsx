import React, {useEffect, useState} from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";

const Dropdown = (props: {
    name: string,
    id?: string,
    options: { key: String, value: String }[],
    selected?: string,
    onSelect: (key: String) => boolean,
    label?: string,
    cClass?: string,
    lClass?: string,
    error?: boolean,
    errorMsg?: string | false | undefined,
    separateLabel?: boolean,
    required?: boolean,
}) => {

    const label = props.label == undefined ? "Select" : props.label
    const separateLabel = props.separateLabel != undefined && props.separateLabel

    const [show, setShow] = useState(false);

    const [selectedOption, setSelectedOption] = useState(props.selected || separateLabel ? "Select" : label);

    function toggle() {
        setShow(!show)
    }

    function selectOption(key: string, value: string) {
        setSelectedOption(value)
        props.onSelect(key)
        toggle()
    }

    useEffect(() => {
        if (!props.selected || props.selected === "") return
        setSelectedOption(props.selected + "")

    }, [props.selected]);
    

    return (
        <div className="relative ">
            {props.label && separateLabel &&
                <div className="mb-2">
                    <label htmlFor={props.label}
                           className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${props.lClass} ${props.error ? "text-red-600" : ""}`)}>
                        {upperFirst(props.label)}
                        <span className="text-red-500">{props.required ? "*" : ""}</span>
                    </label>
                </div>
            }

            <div
                className={overrideTailwindClasses(`relative w-full bg-gray-200 rounded outline-none dropdown-one ${props.cClass} ${props.error ? "bg-red-50 border border-red-400" : ""}`)}>
                <button onClick={toggle} className="relative flex items-center justify-between w-full px-5 pl-3 py-3"
                        type="button">
                      <span className="pr-4 text-sm leading-none font-medium text-gray-800"
                            id="drop-down-content-setter">
                        {String(selectedOption)}
                      </span>
                    <svg id="rotate" className="absolute z-10 cursor-pointer right-5" width={10} height={6}
                         viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

                <div
                    className={`${show ? "" : "hidden"} absolute z-20 right-0 w-full px-1 py-2 top-8`}
                    id="drop-down-div">
                    <div className={"fixed top-0 left-0 h-screen w-screen z-0"} onClick={toggle}></div>
                    <div
                        className={"w-full absolute flex flex-col z-30 bg-white border-t border-gray-200 rounded shadow"}>

                        {props.options.map((option, index) => {

                            return (
                                <a key={index} onClick={() => selectOption(String(option.key), String(option.value))}
                                   className="hover"><p
                                    className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded">
                                    {option.value}
                                </p></a>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
            {props.errorMsg &&
                <p className="text-xs font-normal leading-normal text-red-600">
                    {props.errorMsg}
                </p>
            }
            {/* end */}
        </div>
    );
};

export default Dropdown;
