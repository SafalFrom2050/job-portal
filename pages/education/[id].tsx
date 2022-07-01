import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {getGrades} from "../../API/education.api";
import {Grade} from "../../@types/grade";
import {useRouter} from "next/router";
import Heading from "../../components/common/heading";
import {Lesson} from "../../@types/lesson.d.";
import Link from 'next/link';

function Lessons() {

    const [selectedLessonIndex, setSelectedLessonIndex] = useState(undefined as number | undefined)
    const gradeId = useRouter().query.id

    const {isLoggedIn} = useContext(AuthContext) as AuthContextType

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery("grades", fetchGrades, {enabled: !!axiosInstance})

    function fetchGrades() {
        return getGrades(axiosInstance)
    }

    const grades = (data?.data || []) as Grade[]

    // TODO: grade id and grade values issue
    const selectedGrade = grades[Number.parseInt(String(gradeId)) - 1]
    const selectedLesson = (selectedGrade ? selectedGrade.lesson ? selectedGrade.lesson[selectedLessonIndex || 0] : {} : {}) as Lesson

    if (!isLoggedIn) return <></>

    function toggleSelectedLessonIndex(index: number) {
        if (selectedLessonIndex == index) {
            setSelectedLessonIndex(undefined)
        } else {
            setSelectedLessonIndex(index)
        }
    }

    return (
        <>
            <div>
                <Heading heading={selectedGrade.name || 'Free Education'}/>
                <div className="mx-auto container pb-10 lg:px-20 md:px-6 px-4 max-w-[1000px] ">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-items-around gap-4 xl:gap-6 w-full">

                            {selectedGrade.lesson?.map((lesson, i) => (
                                <div key={i} className={'bg-white rounded'}>
                                    <button onClick={() => toggleSelectedLessonIndex(i)}
                                            className="w-full transform transition-shadow shadow hover:shadow-lg focus:outline-none border focus:border-gray-800 border-transparent bg-gray-50 flex justify-start items-center text-center pr-4 gap-x-8">
                                        <h3 className={"text-3xl font-light text-indigo-600 bg-indigo-200 p-8"}>{i + 1}</h3>
                                        <p className="text-xl whitespace-nowrap font-medium text-gray-800">{lesson.name}</p>
                                    </button>

                                    {
                                        selectedLessonIndex !== undefined && selectedLessonIndex === i &&
                                        <div className={'p-4'}>
                                            <p className="text-xl whitespace-nowrap text-gray-800 mb-2">{selectedLesson.description}</p>

                                            <iframe
                                                className={'w-full aspect-video'}
                                                src={selectedLesson.video_url?.replace('watch?v=', 'embed/')}
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen/>
                                        </div>
                                    }
                                </div>
                            ))}


                        </div>
                        <div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
                            <div className=" flex justify-start items-start flex-col text-left w-full ">
                                <h3 className="text-xl font-medium leading-7 md:leading-5 text-left text-gray-800">How
                                    does this work?</h3>
                                <p className="mt-6 text-base leading-6 text-gray-600">We are working hard to help
                                    students all around the country to have access to basic education.</p> <br/>
                                <p className="text-base leading-6 text-gray-600">For starters, we have prepared video
                                    resources that you can check out for each levels and chapters.</p> <br/>

                            </div>
                            <hr className="border border-gray-100 w-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lessons;