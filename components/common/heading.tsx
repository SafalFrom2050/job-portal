import React from "react";
import {overrideTailwindClasses} from "tailwind-override";
import {SortDescendingIcon} from "@heroicons/react/solid";

const Heading = (props: { heading: string, count?: number, sort?: boolean }) => {
    return (
        <div
            className={overrideTailwindClasses(`mx-auto pb-4 pt-8 px-4 2xl:mx-auto flex justify-center items-center max-w-[800px]`)}>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start">
                    <div className="mt-2 flex flex-row justify-end items-center space-x-3">
                        <p className="text-2xl font-semibold leading-normal text-gray-800">{props.heading}</p>
                        {props.count && props.count != 0 &&
                            <p className="text-base leading-4 text-gray-600">({props.count} jobs)</p>
                        }
                    </div>
                </div>

                {props.sort && <>
                    <button
                        className="hover:text-gray-500 text-gray-600 bg-white py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3">
                        <SortDescendingIcon className={"w-6 h-6"}/>
                        <p className="hidden md:block text-sm leading-none">Sort By</p>
                    </button>
                </>
                }

            </div>
        </div>
    );
};

export default Heading;
