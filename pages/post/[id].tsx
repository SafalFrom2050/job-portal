import React, {useContext, useState} from 'react';
import moment from "moment";
import PrimaryButton from "../../components/buttons/primaryButton";
import Spinner from "../../components/common/spinner";
import {useRouter} from "next/router";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {getPostById, Post} from "../../API/post.api";
import {IMAGE_COMPANY_PLACEHOLDER} from '../../others/config';
import Link from "next/link";
import ApplicationFormModal from "../../components/post/applicationFormModal";

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
                <ApplicationFormModal show={showApplicationForm} setShow={setShowApplicationForm}/>
            }


            <div className="container mx-auto flex items-start justify-center">
                <div className="w-full p-2">
                    {/* Card is full width. Use in 12 col grid for best view. */}
                    {/* Card code block start */}
                    <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 rounded">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                            <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">{post.title}</h1>
                            <div
                                className="flex flex-col md:flex-row items-start md:items-center md:w-full justify-end gap-x-4">
                                <div
                                    className="mt-4 lg:mt-0 text-sm bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium py-2 w-48 flex justify-center">
                                    Posted Date: {moment(post.created_date).format("d MMM yyyy")}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center">
                            <div className="w-full lg:w-2/3 pr-0">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded">
                                        <img
                                            className="w-full h-full overflow-hidden object-cover rounded object-center"
                                            src={post.author?.avatar || IMAGE_COMPANY_PLACEHOLDER}
                                            alt="logo"/>
                                    </div>
                                    <Link href={"/org/" + post.author?.id}>
                                        <a className="ml-2">
                                            <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">{post.author?.first_name} {post.author?.last_name}</h5>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">{post.location}</p>
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
                                className="flex flex-col lg:flex-row w-full lg:w-2/3 items-start lg:items-center mb-8 lg:mb-0">
                                <div className="mr-24 flex lg:block items-center mb-4 gap-x-2 lg:mb-0">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Highest
                                        Salary</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">Rs. {post.salary_high}</h2>
                                </div>
                                <div className="mr-24 flex lg:block items-center gap-x-2 mb-4 lg:mb-0">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Lowest
                                        Salary</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">Rs. {post.salary_high}</h2>
                                </div>
                                <div className="flex lg:block items-center gap-x-2">
                                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Position</h3>
                                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{post.position}</h2>
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

                </div>

            </div>
        </div>
    );
}

export default Index;