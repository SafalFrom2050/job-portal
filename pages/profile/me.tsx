import React, {useContext} from "react";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import {BASE_URL} from "../../others/config";
import Image from "next/image";

function Index() {

    const {user, isLoggedIn} = useContext(AuthContext) as AuthContextType;


    if (!isLoggedIn) return <></>

    return (
        <>
            <div className="flex items-center justify-center w-full">
                {/* Card code block start */}
                <div className="w-full">
                    <div className="relative">
                        <img className="h-56 w-full object-cover object-center"
                             src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png"/>
                        <div
                            className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 rounded border-2 shadow border-white">
                                <Image
                                    layout={'fill'}
                                    objectFit={'cover'}
                                    src={user && user.avatar ? BASE_URL + user.avatar?.substring(1) : "/images/default-profile.png"}
                                />
                            {/*<img className="w-full h-full overflow-hidden object-cover rounded" src={user && user.avatar ? BASE_URL + user.avatar?.substring(1) : "/images/default-profile.png"} />*/}
                        </div>
                    </div>
                    <div className="px-5 pb-10">
                        <div className="flex justify-center w-full pt-16">
                            <div className="flex items-center">
                                <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                     xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="currentColor"
                                          d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
                                </svg>
                                <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                     xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="currentColor"
                                          d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
                                </svg>
                                <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                     xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="currentColor"
                                          d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
                                </svg>
                                <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                     xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="currentColor"
                                          d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
                                </svg>
                                <svg className="w-4 text-gray-200 icon icon-tabler icon-tabler-star"
                                     xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" fill="none" d="M0 0h24v24H0z"/>
                                    <path fill="currentColor"
                                          d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="pt-3 flex flex-col items-center justify-between ">
                            <div className=" w-full xl:w-2/3">
                                <div className="text-center mb-3 flex flex-row items-center justify-center ">
                                    <h2 className="mb-3 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">{user.first_name} {user.last_name}</h2>
                                </div>
                                <p className="text-center mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">HI,
                                    I am a developer interested in frontend technologies such as React, Angular. I have
                                    a past experience with Laravel, Nextjs, Java Swing, React Native and Android
                                    Development. To know more about me, please check out my CV.</p>
                            </div>
                            <div className=" w-full py-5 flex items-start justify-center">
                                <div className="">
                                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">82</h2>
                                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">Reviews</p>
                                </div>

                            </div>
                            <div className="w-full flex-col md:flex-row justify-center flex">
                                <div className="flex items-center justify-center mt-1 md:mt-0 mb-5 md:mb-0 ">
                                    <div
                                        className="rounded-full bg-green-200 text-green-500 text-sm px-6 py-2 flex justify-center items-center">Available
                                    </div>
                                </div>
                                <button
                                    className="focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded-full text-white px-3 md:px-6 py-2 text-sm">Contact
                                    Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Card code block end */}
            </div>
        </>
    );
}

export default Index;
