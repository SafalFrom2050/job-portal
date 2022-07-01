import React, {useContext, useState} from 'react';
import Heading from "../../components/common/heading";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {getGrades} from "../../API/education.api";
import {Grade} from "../../@types/grade";
import Link from "next/link";

function Index() {

    const [selectedLevel, setSelectedLevel] = useState();

    const {isLoggedIn} = useContext(AuthContext) as AuthContextType;

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {data, isLoading} = useQuery("grades", fetchGrades, {enabled: !!axiosInstance})

    function fetchGrades() {
        return getGrades(axiosInstance)
    }

    const grades = (data?.data || []) as Grade[]

    if (!isLoggedIn) return <></>

    return (
        <>
            <div>
                <Heading heading={"Free Education"}/>
                <div className="mx-auto container pb-10 lg:px-20 md:px-6 px-4 max-w-[1000px] ">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 justify-items-around gap-4 xl:gap-6">

                            {grades.map((level, i) => (
                                <Link key={i} href={`/education/${level.id}`}>
                                    <a className="w-full transform transition-shadow shadow hover:shadow-lg focus:outline-none border focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
                                        <h3 className={"text-3xl font-light text-indigo-600"}>{i + 1}</h3>
                                        <p className="text-xl whitespace-nowrap font-medium text-gray-800">{level.name}</p>
                                    </a>
                                </Link>
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
    );
}

export default Index;