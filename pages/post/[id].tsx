import React, {useContext, useState} from 'react';
import moment from "moment";
import PrimaryButton from "../../components/buttons/primaryButton";
import Spinner from "../../components/common/spinner";
import {useRouter} from "next/router";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {getPostById, Post} from "../../API/post.api";
import {APP_DESCRIPTION, APP_NAME, APP_URL, BASE_URL, IMAGE_COMPANY_PLACEHOLDER} from '../../others/config';
import Link from "next/link";
import ApplicationFormModal from "../../components/post/applicationFormModal";
import {FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton} from "react-share";
import {CurrencyRupeeIcon, LocationMarkerIcon} from "@heroicons/react/solid";
import {formatCurrency} from "../../others/helpers";
import {ClockIcon} from "@heroicons/react/outline";

function Index() {

    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const {id} = useRouter().query

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {
        data,
        isLoading
    } = useQuery("author:" + id, () => getPostById(axiosInstance, String(id)), {enabled: !!axiosInstance})

    const post = data?.data as Post

    function toggleApplicationForm() {
        setShowApplicationForm((state) => !state)
    }

    if (!post) return <div className={"max-w-[1000px] mx-auto h-[600px] flex items-center"}>
        <Spinner/>
    </div>

    return (
        <div className="container max-w-[1000px] mx-auto w-full pt-8">

            {showApplicationForm &&
                <ApplicationFormModal postId={String(id)} show={showApplicationForm} setShow={setShowApplicationForm}/>
            }


            <div className="container mx-auto flex items-start justify-center">
                <div className="w-full p-2">
                    {/* Card is full width. Use in 12 col grid for best view. */}
                    {/* Card code block start */}
                    <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 rounded">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                            <div className={'mr-24 w-full'}>
                                <h1 className="text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">{post.title}</h1>

                                <div className=" flex items-center gap-x-2 text-indigo-700 text-sm">
                                    <CurrencyRupeeIcon className={"w-4 h-4"} />
                                    <h3 className="font-normal truncate">
                                        {formatCurrency(post.salary_low)} - {formatCurrency(post.salary_high)}
                                    </h3>
                                </div>
                            </div>
                            <div
                                className="flex flex-col md:flex-row items-start md:items-center md:w-full justify-end gap-x-4">
                                <div
                                    className="mt-4 lg:mt-0 text-sm bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium py-2 px-3 flex gap-x-2 items-center justify-center">
                                    <ClockIcon className={'w-5 h-5 ml-auto'} />
                                    Posted Date: {moment(post.created_date).format("d MMM yyyy")}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center">
                            <div className="w-full lg:w-4/5 pr-0">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded">
                                        <img
                                            className="w-full h-full overflow-hidden object-cover rounded object-center"
                                            src={post.author?.avatar ? BASE_URL + post.author?.avatar.substring(1) : IMAGE_COMPANY_PLACEHOLDER}
                                            alt="logo"/>
                                    </div>
                                    <Link href={"/org/" + post.author?.id}>
                                        <a className="ml-2">
                                            <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">{post.author?.first_name} {post.author?.last_name}</h5>
                                            <p className="flex gap-x-1 text-gray-600 dark:text-gray-400 text-xs font-normal"><LocationMarkerIcon className={'w-4 h-4'} /> {post.location}</p>
                                        </a>
                                    </Link>
                                </div>
                                <h6 className={"mt-8 font-medium"}>Job Description</h6>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-normal">{post.description}</p>
                            </div>

                        </div>
                        <div className="relative">
                            <hr className="mt-8 mb-8 lg:mb-10 h-[2px] rounded bg-gray-200"/>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center">
                            <div
                                className="flex flex-col gap-x-24 gap-y-4 lg:flex-row w-full lg:w-2/3 items-start lg:items-center lg:mb-0">
                                <div className="flex lg:block items-center gap-x-2 lg:mb-0">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Subject</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{post.field?.name}</h2>
                                </div>
                                <div className="flex lg:block items-center gap-x-2">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Level</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{post.position}</h2>
                                </div>
                                <div className="flex lg:block items-center gap-x-2">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Lodging</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{post.lodging ? 'Yes' : 'No'}</h2>
                                </div>
                            </div>
                            <div className={"ml-auto"}>
                                <PrimaryButton
                                    onClick={toggleApplicationForm}
                                    class={"text-base font-medium"}
                                    name={"Apply"}/>
                            </div>
                        </div>


                    </div>
                    {/* Card code block end */}

                    <div className="px-10 pt-4">
                        <h6 className={"mb-2 font-medium"}>Share on</h6>
                        <FacebookShareButton
                            url={APP_URL}
                            quote={APP_DESCRIPTION}
                            hashtag={"#" + APP_NAME}
                        >
                            <FacebookIcon size={28}/>
                        </FacebookShareButton>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Index;