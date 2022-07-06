import React from "react";
import {overrideTailwindClasses} from "tailwind-override";

export default function Pagination(props: {
    onPreviousClick: () => any,
    onNextClick: () => any,
    disablePreviousButton?: boolean,
    disableNextButton?: boolean,
    onPageNumberClick?: (pageNumber: number)=> void,
    count?: number,
    currentPageNumber?: number
}) {

    function onPrevious() {
        if (!props.disablePreviousButton) {
            props.onPreviousClick()
        }
    }

    function onNext() {
        if (!props.disableNextButton) {
            props.onNextClick()
        }
    }

    function PageNumberComponent() {

        let pageNumbers: Array<any> = []

        for (let i = 1; i <= (props.count || 1); i++) {
            const pageNumber = <>{props.currentPageNumber == i
                ?
                <p onClick={()=>props.onPageNumberClick && props.onPageNumberClick(i)} className="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2">{i}</p>
                :
                <p onClick={()=>props.onPageNumberClick && props.onPageNumberClick(i)} className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">{i}</p>
            }</>

            pageNumbers = [...pageNumbers, pageNumber]
        }

        return pageNumbers
    }

    return (
        <>
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                    <div onClick={onPrevious}
                         className={`flex items-center pt-3 ${props.disablePreviousButton ? 'text-gray-300' : 'text-gray-600  hover:text-indigo-700 cursor-pointer'}`}>
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={overrideTailwindClasses(`text-sm ml-3 font-medium leading-none `)}>Previous</p>
                    </div>
                    <div className="sm:flex hidden">
                        {PageNumberComponent()}
                    </div>
                    <div onClick={onNext}
                         className={`flex items-center pt-3 ${props.disableNextButton ? 'text-gray-300' : 'text-gray-600 hover:text-indigo-700 cursor-pointer'}`}>

                        <p className={`text-sm font-medium leading-none mr-3 `}>Next</p>

                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
