import {useEffect, useState} from "react";
import {SearchIcon} from "@heroicons/react/solid";
import {ArrowDown, ArrowUp} from "heroicons-react";
import PrimaryButton from "../buttons/primaryButton";
import TextButton from "../buttons/textButton";
import Dropdown from "../common/dropdown/dropdown";
import TextInput from "../inputs/textInput";
import WhiteButton from "../buttons/whiteButton";


function Search() {

    const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);


    const titleTypes = [
        {key: "1", value: "School/College"},
        {key: "2", value: "Security"},
        {key: "3", value: "IT"},
        {key: "4", value: "Banking"},
        {key: "5", value: "Receptionist"},
    ]

    const positionTypes = [
        {key: "1", value: "Teacher"},
        {key: "2", value: "Driver"},
        {key: "3", value: "Developer"},
        {key: "4", value: "Backend"}
    ]

    function toggleAdvanceOptions() {
        setShowAdvanceOptions((v) => !v)
    }

    return (
        <>
            <div>

                <div className="relative">
                    <div className="py-4 px-7">
                        <div className="mt-7 pt-0  rounded-[4px]  bg-white max-w-[400px] w-full mx-auto ">
                            <div className={`px-8 py-6 mt-12 transition-all`} id="interaction">
                                <div className="flex flex-col w-full gap-y-2">
                                    <div className="relative w-full">
                                        <input placeholder="Search Job"
                                               className="p-4 py-2 outline-none focus pr-10  bg-gray-50 border rounded border-gray-100 text-slate-600 w-full leading-4"/>

                                        <SearchIcon
                                            className="w-6 h-6 absolute pointer-events-none top-2 right-5 text-gray-600"/>

                                    </div>
                                    <div className="flex justify-between w-full h-10 mt-3 gap-x-2 flex-wrap">

                                        <TextButton
                                            name={"Advanced"}
                                            onClick={toggleAdvanceOptions}
                                            class={"text-sm"}
                                            cClass={"h-full flex items-center"}
                                            iconRight={<ArrowDown className={`w-4 h-4 transform duration-150 ${showAdvanceOptions ? "rotate-180" : ""}`} />}
                                        />

                                        <PrimaryButton
                                            name={'Search'}
                                            cClass="h-full flex items-center"
                                            class={`${showAdvanceOptions ? "hidden" : ""} font-medium text-base mx-0`}/>
                                    </div>
                                </div>
                                <div className={` transition-all duration-150 ${showAdvanceOptions ? "h-auto min-h-0 max-h-screen" : "max-h-0 overflow-hidden"} `}>
                                    <hr className="bg-[#F1F5F9] my-6"/>

                                    <div className={"flex flex-col gap-3"}>
                                        {/* Interaction */}

                                        <Dropdown name={"title"} options={titleTypes} onSelect={()=>false} label="Title" cClass={"bg-white border border-gray-200"} />

                                        <Dropdown name={"post"} options={positionTypes} onSelect={()=>false} label="Position" cClass={"bg-white border border-gray-200"}/>

                                        <TextInput  name="location" placeholder="Location" type="text" iClass="bg-white mt-0 text-sm px-5 font-medium text-gray-600 placeholder-gray-400"/>

                                    </div>
                                    <div
                                        className="flex flex-col items-center justify-end w-full gap-4 mt-12 lg:flex-row">
                                        <WhiteButton name={"Add Filter"} class="font-medium text-sm" />
                                        <PrimaryButton name={"Search"} class="font-medium text-base" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
