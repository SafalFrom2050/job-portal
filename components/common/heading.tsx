import React from "react";
import {overrideTailwindClasses} from "tailwind-override";
import {ArrowLeft} from "heroicons-react";
import Router, {useRouter} from "next/router";

const Heading = (props: { heading: string, count?: number, sort?: boolean, cClass?: string, hClass?: string, showBackButton?: boolean, backButtonAction?: () => void }) => {

    const Router = useRouter()

    function goBack() {
        Router.back()
    }
    return (
        <div
            id="heading"
            className={overrideTailwindClasses(`mx-auto px-4 py-2 flex justify-center items-center max-w-[1000px] z-10 ${props.cClass}`)}>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full">
                    <div className="mt-2 flex flex-row items-center gap-x-3 w-full">
                        {props.showBackButton &&
                            <ArrowLeft onClick={props.backButtonAction || goBack} className={"cursor-pointer w-6 h-6 mr-2"}/>
                        }
                        <p className={overrideTailwindClasses(`font-semibold leading-normal text-2xl text-gray-800 ${props.hClass}`)}>{props.heading}</p>
                        {(props.count || props.count == 0) &&
                            <p className=" text-base leading-4 text-gray-600">({props.count} jobs)</p>
                        }
                    </div>
                </div>

                {props.sort && <>
                    <div
                        className="w-40 sm:w-fit sm:mt-0 py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-white hover:bg-gray-50 cursor-pointer rounded">
                        <p className={"w-14"}>Sort By:</p>
                        <select className="focus:outline-none bg-transparent ml-1 cursor-pointer">
                            <option className="text-sm text-indigo-800">Latest</option>
                            <option className="text-sm text-indigo-800">Oldest</option>
                        </select>
                    </div>
                </>
                }

            </div>
        </div>
    );
};

export default Heading;
