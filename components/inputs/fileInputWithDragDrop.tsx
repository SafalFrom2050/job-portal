import React, {useState} from 'react';
import {overrideTailwindClasses} from "tailwind-override";

function FileInputWithDragDrop(props: { message?: String, cClass?: String }) {

    const [isDropping, setIsDropping] = useState(false);

    return (
        <div
            onDrop={(ev) => {
                ev.preventDefault();
                setIsDropping(false)
                console.log(ev.dataTransfer.files)
            }}

            onDragOver={(ev) => {
                ev.preventDefault();
            }}
            onDragOverCapture={(ev) => {
                ev.preventDefault();
                setIsDropping(true)
            }}

            onDragLeave={(ev) => {
                ev.preventDefault();
                setIsDropping(false)
            }}
            className={overrideTailwindClasses(`flex flex-col items-center justify-center w-full mb-8 border border-dashed border-indigo-700 rounded-lg py-8 ${props.cClass} ${isDropping && 'bg-indigo-200'}`)}>
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
            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">{props.message || "Drag and drop here"}</p>
            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">or</p>
            <label htmlFor="fileUp"
                   className="cursor-pointer text-base font-normal tracking-normal text-indigo-700 dark:text-indigo-600 text-center">
                {" "}
                browse{" "}
            </label>
            <input type="file" className="hidden" name="fileUpload" id="fileUp"/>
        </div>
    );
}

export default FileInputWithDragDrop;
