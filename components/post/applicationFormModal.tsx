import React from 'react';
import FileInputWithDragDrop from "../inputs/fileInputWithDragDrop";
import {XIcon} from "@heroicons/react/solid";
import PrimaryButton from "../buttons/primaryButton";

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

                        <h3 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Your Details</h3>
                        <div className="flex justify-center w-full gap-x-2">

                            <FileInputWithDragDrop name={"cv"} message={"Drop your CV here"} onFileChanged={(file)=>console.log(file)}/>

                            <FileInputWithDragDrop name={"cover_letter"} message={"Drop your Cover Letter here"} onFileChanged={(file)=>console.log(file)}/>

                        </div>

                        <div className={'flex gap-x-2 items-center'}>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Your
                                profile information will be used to apply to this job.</p>
                            <PrimaryButton cClass={'ml-auto'} class="font-medium text-sm" name={"Submit"} />
                        </div>

                        {/*Cross Icon*/}
                        <XIcon onClick={() => setShow(!show)}
                               className={'w-5 h-5 cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out'}/>

                    </div>
                </div>
            </div>}
        </form>
    );
}

export default ApplicationFormModal;