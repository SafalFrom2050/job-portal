import React from 'react';
import TextInput from "../inputs/textInput";
import ModalPortfolioFiles from "../account/modalPortfolioFiles";

function ApplicationFormModal(props: {
    show: boolean,
    setShow: (v: boolean) => void,
}) {

    const {show, setShow} = props

    return (
        <form>
            {show && <div
                className="py-12 flex items-center bg-gray-50 bg-opacity-50 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0"
                id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div
                        className="relative py-4 px-8 md:px-8 bg-white shadow-md rounded">

                        <h3 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Application Form</h3>
                        <div className="flex flex-col items-center justify-center w-full">

                            <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">Confirmation</h1>
                            <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">Your profile information will be used to apply to this job.</p>
                            <div
                                className="flex flex-col items-center justify-center w-full mb-8 border border-dashed border-indigo-700 rounded-lg py-8">
                                <div className="cursor-pointer mb-5 text-indigo-700 dark:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon icon-tabler icon-tabler-cloud-upload"
                                         width={60} height={60} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"
                                         fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
                                        <polyline points="9 15 12 12 15 15"/>
                                        <line x1={12} y1={12} x2={12} y2={21}/>
                                    </svg>
                                </div>
                                <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">Drag
                                    and drop here</p>
                                <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">or</p>
                                <label htmlFor="fileUp"
                                       className="cursor-pointer text-base font-normal tracking-normal text-indigo-700 dark:text-indigo-600 text-center">
                                    {" "}
                                    browse{" "}
                                </label>
                                <input type="file" className="hidden" name="fileUpload" id="fileUp"/>
                            </div>

                        </div>
                        {/*Cross Icon*/}
                        <div
                            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                            onClick={() => setShow(!show)}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close"
                                 className="icon icon-tabler icon-tabler-x" width={20} height={20}
                                 viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <line x1={18} y1={6} x2={6} y2={18}/>
                                <line x1={6} y1={6} x2={18} y2={18}/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>}
        </form>
    );
}

export default ApplicationFormModal;