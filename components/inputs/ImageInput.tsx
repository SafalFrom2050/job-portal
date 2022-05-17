import React, {ChangeEvent, useState} from 'react';
import {PencilAltIcon} from "@heroicons/react/solid";
import {overrideTailwindClasses} from "tailwind-override";

function ImageInput(props: {
    label?: string,
    name?: string,
    value?: string,
    handleChange?: (target: HTMLInputElement & EventTarget) => void,
    lClassName?: string,
    pClassName?: string,
    className?: string,
    size?: number,
}) {

    const {value, name, label = '', handleChange, lClassName, pClassName, className, size = 36}  = props

    const [pictureSrc, setPictureSrc] = useState(value || "");

    const onHandleChange = (target: HTMLInputElement & EventTarget) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPictureSrc(String(e.target?.result))
        }

        if (target.files){
            reader.readAsDataURL(target.files[0]);
        }

        if (handleChange){
            handleChange(target)
        }
    };

    return (
        <div className={overrideTailwindClasses(`w-full h-${size} bg-red flex flex-col items-center relative ${pClassName}`)}>

            <label htmlFor={name} className={overrideTailwindClasses(`w-${size} h-${size} relative`)}>
                <span aria-hidden="true">
                    <div
                        className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat absolute shadow flex items-center justify-center">
                        <img src={pictureSrc && pictureSrc !== '' ? pictureSrc : '/images/default-profile.jpeg'}
                             alt={"Profile Picture"}
                             className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"/>
                        <div className="absolute bg-black opacity-30 top-0 right-0 bottom-0 left-0 rounded-full z-0"/>
                        <div
                            className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100 mt-4">


                            <PencilAltIcon className={'w-5 h-5'}/>
                            <p className="text-xs">Edit</p>
                        </div>
                    </div>

                </span>

                <input
                    type="file" accept="image/*" id={name}
                    name={name}
                    className={'hidden'}
                    onChange={(e)=>{onHandleChange(e.target);}}
                />

            </label>

            {label &&
                <p className={`mt-1 text-center text-sm font-bold ${lClassName}`}>{label}</p>
            }

        </div>
    );
}

export default ImageInput;
