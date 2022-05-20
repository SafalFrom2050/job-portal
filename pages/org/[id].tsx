import React, {useContext} from "react";
import Heading from "../../components/common/heading";
import PrimaryButton from "../../components/buttons/primaryButton";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getUserById} from "../../API/user.api";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import Spinner from "../../components/common/spinner";
import moment from "moment";
import {Post, searchPosts} from "../../API/post.api";
import PostListItem from "../../components/post/PostListItem";

function Index() {


    const {id} = useRouter().query

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {data, isLoading} = useQuery("author:" + id, getUser, {enabled: !!axiosInstance})

    const user = data?.data

    const postsQuery = useQuery("posts_by_author: " + id, () => searchPosts(axiosInstance, {author: String(id)}), {enabled: !!axiosInstance})

    const posts = postsQuery.data?.data.results as Post[]

    function getUser() {
        return getUserById(axiosInstance, Number.parseInt(id + ""))
    }

    if (!user) return <div className={"max-w-[1000px] mx-auto h-[600px] flex items-center"}>
        <Spinner/>
    </div>

    return (
        <>
            <div className="container max-w-[1000px] mx-auto w-full pt-8">

                <div className="container mx-auto flex items-start justify-center">
                    <div className="w-full p-2">
                        {/* Card is full width. Use in 12 col grid for best view. */}
                        {/* Card code block start */}
                        <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 rounded">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">Company
                                    Profile</h1>
                                <div
                                    className="flex flex-col md:flex-row items-start md:items-center md:w-full justify-end gap-x-4">
                                    <div
                                        className="mt-4 lg:mt-0 text-sm bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium py-2 w-48 flex justify-center">
                                        Created Date: {moment(user.birth_date).format("d MMM yyyy")}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <div className="w-full lg:w-2/3 pr-0">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded">
                                            <img
                                                className="w-full h-full overflow-hidden object-cover rounded object-center"
                                                src={user.avatar || "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png"}
                                                alt="logo"/>
                                        </div>
                                        <div className="ml-2">
                                            <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">{user.org_title}</h5>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">{user.location}</p>
                                        </div>
                                    </div>
                                    <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 font-normal">{user.org_description}</p>
                                </div>

                            </div>
                            <div className="relative">
                                <hr className="mt-8 mb-8 lg:mb-10 h-[2px] rounded bg-gray-200"/>
                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <div
                                    className="flex flex-col lg:flex-row w-full lg:w-2/3 items-start lg:items-center mb-8 lg:mb-0">
                                    <div className="mr-24 flex lg:block gap-x-2 items-center mb-4 lg:mb-0">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Average
                                            Salary</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">Rs. {user.org_average_salary}</h2>
                                    </div>
                                    <div className="mr-24 flex lg:block gap-x-2 items-center mb-4 lg:mb-0">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Job
                                            Posts</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{user.org_number_of_job_post}</h2>
                                    </div>
                                    <div className="flex lg:block gap-x-2 items-center">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Employees</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">{user.org_number_of_employees}</h2>
                                    </div>
                                </div>
                                <div className={"ml-auto"}>
                                    <PrimaryButton
                                        class={"text-base font-medium"}
                                        name={"Contact"}/>
                                </div>
                            </div>
                        </div>
                        {/* Card code block end */}

                    </div>

                </div>
            </div>
            <Heading heading={"Posted Jobs"}/>

            <div className={"container mx-auto max-w-[1000px]"}>
                {postsQuery.isLoading && <Spinner/>}
                <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    {posts && posts.length > 0 ?
                        posts.map((post, i) => (
                            <PostListItem key={i} post={post}/>
                        ))
                        :
                        posts?.map((post, i) => (
                            <PostListItem key={i} post={post}/>
                        ))
                    }
                </div>

            </div>
        </>
    );
}

export default Index;
