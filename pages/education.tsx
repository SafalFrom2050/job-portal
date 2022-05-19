import React, {useState} from 'react';
import Heading from "../components/common/heading";

function Education() {

    const [selectedLevel, setSelectedLevel] = useState();

    const subjects = [
        {
            level: 1,
            name: "Science"
        },

        {
            level: 1,
            name: "English"
        },

        {
            level: 1,
            name: "Mathematics"
        },

        {
            level: 1,
            name: "Nepali"
        },
    ]

    const levels = [
        {
            name: "Class 1",
            subjects: subjects
        },
        {
            name: "Class 2",
            subjects: subjects
        },
        {
            name: "Class 3",
            subjects: subjects
        },
        {
            name: "Class 4",
            subjects: subjects
        },
        {
            name: "Class 5",
            subjects: subjects
        },
        {
            name: "Class 6",
            subjects: subjects
        },
    ]

    return (
        <>
            
            <div>
                <Heading heading={"Free Education"} />
                <div className="mx-auto container py-10 lg:px-20 md:px-6 px-4 max-w-[800px] ">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 justify-items-around gap-x-6 gap-y-6 xl:gap-y-8 xl:gap-x-8 ">

                            {levels.map((level, i)=>(
                                <button key={i} className="w-full transform transition-shadow shadow hover:shadow-lg focus:outline-none border focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
                                    <h3 className={"text-3xl font-light text-indigo-600"}>{i + 1}</h3>
                                    <p className="text-xl whitespace-nowrap font-medium text-gray-800">{level.name}</p>
                                </button>
                            ))}

                        </div>
                        <div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
                            <div className=" flex justify-start items-start flex-col text-left w-full ">
                                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">How does this work?</h3>
                                <p className="mt-6 text-base leading-6 text-gray-600">We are working hard to help students all around the country to have access to basic education.</p> <br />
                                <p className="text-base leading-6 text-gray-600">For starters, we have prepared video resources that you can check out for each levels and chapters.</p> <br />

                            </div>
                            <hr className="border border-gray-100 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Education;