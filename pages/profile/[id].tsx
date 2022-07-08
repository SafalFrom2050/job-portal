import React, {useContext} from "react";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {BASE_URL} from "../../others/config";
import Image from "next/image";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {getUserById} from "../../API/user.api";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {ClockIcon} from "@heroicons/react/outline";
import {BadgeCheckIcon, DocumentDownloadIcon, MailIcon, PhoneIcon, XCircleIcon} from "@heroicons/react/solid";

function Index() {

    const id = useRouter().query.id

    const {isLoggedIn} = useContext(AuthContext) as AuthContextType;

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {data, isLoading} = useQuery("profile:" + id, fetchProfile, {enabled: !!axiosInstance})

    function fetchProfile() {
        return getUserById(axiosInstance, String(id))
    }

    const user = (data?.data || {}) as User
    console.log(user)

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
                            <div>
                                {user.is_available
                                    ?
                                    <p className={"flex items-center gap-x-1 px-2 py-1 text-sm text-indigo-700 rounded-full hover:bg-indigo-100 overflow-hidden transition-all pr-2"}>
                                        <div className={"bg-indigo-700 rounded-full m-[1px]"}><BadgeCheckIcon
                                            className={"w-6 h-6 text-white"}/></div>
                                        Available to Work</p>
                                    :
                                    <p className={"flex items-center gap-x-1 px-2 py-1 text-sm text-red-700 rounded-full hover:bg-red-100 overflow-hidden transition-all pr-2"}>
                                        <div className={"bg-red-700 rounded-full m-[1px]"}><XCircleIcon
                                            className={"w-6 h-6 text-white"}/></div>
                                        Not available to work</p>
                                }
                                {/*<LightningBoltIcon className={"w-6 h-6"}/>*/}
                            </div>
                        </div>
                        <div className="pt-3 flex flex-col items-center justify-between ">
                            <div className=" w-full xl:w-2/3">
                                <div className="text-center mb-3 flex flex-col items-center justify-center ">
                                    <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">{user.first_name} {user.last_name}</h2>
                                    <p className={"text-gray-400 text-sm"}>{user.position || 'Position Unspecified'}</p>
                                </div>
                                <p className="text-center mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">A
                                    Teacher is a professional who teaches students based on national curriculum
                                    guidelines within their specialist subject areas. Their duties include assigning
                                    homework, grading tests, documenting progress and keeping up with parent
                                    communication.</p>
                            </div>
                            <div className=" w-full py-5 flex items-start justify-center">

                                <div className="flex justify-center items-center py-6">
                                    <ClockIcon className={"w-24 h-24"}/>
                                    <div className="text-gray-800 w-1/2 pl-8 ">
                                        <h1 className="font-bold text-2xl lg:text-5xl tracking-1px">{user.experience}</h1>
                                        <h2 className="text-base lg:text-lg mt-4 leading-8 tracking-wide">Years of
                                            Experience</h2>
                                    </div>
                                </div>

                            </div>

                            <div className={"w-full mt-4 flex gap-x-4 items-center justify-center"}>
                                <h2 className="text-base text-indigo-800 tracking-normal">Contact Me:</h2>
                                <a href={`mailto:${user.email}`} className={"cursor-pointer"}>
                                    <MailIcon
                                        className={"w-10 h-10 text-indigo-700 transition-transform hover:scale-150"}/>
                                </a>

                                <a href={`tel:${user.phone}`} className={"cursor-pointer"}>
                                    <PhoneIcon
                                        className={"w-10 h-10 text-indigo-700 transition-transform hover:scale-150"}/>
                                </a>

                                <a href={user.cv}
                                   className={"relative cursor-pointer transition-transform hover:scale-150"}>
                                    <DocumentDownloadIcon className={"w-10 h-10 text-indigo-700 "}/>
                                    <p className={"absolute top-1 left-3 text-white font-bold text-[8px]"}>CV</p>
                                </a>
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
