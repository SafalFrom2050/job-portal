import React, {useContext, useState} from "react";
import {getPosts, Post, PostRequestOptions} from "../../API/post.api";
import {formatCurrency, smoothScrollTop} from "../../others/helpers";
import {ClockIcon, CurrencyRupeeIcon, TrashIcon} from "@heroicons/react/outline";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import moment from "moment";
import {PencilAltIcon} from "@heroicons/react/solid";


function PostManagerList() {


    const {query} = useRouter()

    const [postDataUrl, setPostDataUrl] = useState('post/');

    const [postsCount, setPostsCount] = useState(20)

    const {user} = useContext(AuthContext) as AuthContextType

    const [postDataOptions, setPostDataOptions] = useState({
        url: postDataUrl,
        limit: postsCount,
        author: user.id, ...query
    } as PostRequestOptions)

    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const pageIndex = currentPageNumber - 1

    const {axiosInstanceGuest} = useContext(AxiosContext) as AxiosContextType


    const {data, isLoading} = useQuery(postDataUrl + Object.values(postDataOptions), fetchPosts, {
        enabled: axiosInstanceGuest != null,
        retryOnMount: true
    })

    const posts = (data?.data ? data?.data.results : []) as Post[]

    const count = data?.data ? data?.data.count : 0
    const nextPostData: string = data?.data ? data?.data.next : undefined
    const previousPostData: string = data?.data ? data?.data.previous : undefined


    function fetchPosts() {
        return getPosts(axiosInstanceGuest, postDataOptions)
    }

    function setNextPosts() {
        if (nextPostData != undefined) {
            setPostDataOptions({...postDataOptions, offset: (pageIndex + 1) * postsCount})
            setCurrentPageNumber((i) => ++i)
            smoothScrollTop()
        }

    }

    function setPreviousPosts() {
        if (previousPostData != undefined) {
            setPostDataOptions({...postDataOptions, offset: (pageIndex - 1) * postsCount})
            setCurrentPageNumber((i) => --i)
            smoothScrollTop()
        }
    }

    function setPageNumber(pageNumber: number) {
        setPostDataOptions({...postDataOptions, offset: (pageNumber - 1) * postsCount})
        setCurrentPageNumber(pageNumber)
        smoothScrollTop()
    }

    function setSearchOptions(options: PostRequestOptions) {
        // router.push({pathname: '/search', query: options as any})

        setPostDataOptions({...postDataOptions, ...options})
        smoothScrollTop()
    }


    return (
        <>
            <div className="w-full max-w-2xl px-4 mx-auto">
                <div className="border rounded-lg border pb-6 border-gray-200 bg-white">
                    <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
                        <p className="py-2.5 text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                            All Job Posts
                        </p>

                    </div>
                    <div className="px-6 pt-6 overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                            {posts.map((post) => {
                                return <PostRowItem key={post.id} post={post}/>
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

function PostRowItem(props: { post: Post, onDelete?: (postId: number) => void, onEdit?: (postId: number) => void }) {
    return <tr>
        <td>
            <div className="flex my-6">
                <div className="bg-gray-100 rounded-sm h-12 flex items-center justify-center aspect-square">
                    <p className={"font-medium text-sm"}>{props.post.field?.name?.substring(0, 3)}</p>
                </div>
                <div className="pl-3">
                    <div className="flex items-center text-sm leading-none">
                        <p className="font-semibold text-gray-800">{props.post.title}</p>
                        <p className="text-blue-500 ml-3">({props.post.position})</p>
                    </div>
                    <p className="text-xs md:text-sm leading-none text-gray-600 mt-2 w-[200px] break-words truncate">{props.post.description}</p>

                    <div className={"text-gray-800 mt-4 flex items-center gap-x-2"}>
                        <button>
                            <TrashIcon className={"w-5 h-5 text-red-500"}/>
                        </button>

                        <button>
                            <PencilAltIcon className={"w-5 h-5"}/>
                        </button>
                    </div>
                </div>
            </div>

        </td>
        <td className="pl-20">
            <div className={'flex flex-col gap-y-2'}>
                <div className="flex items-center gap-x-1 justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                    <ClockIcon className="w-5 h-5"/>
                    <p className="text-xs leading-3 text-green-700">
                        {moment(props.post.created_date).fromNow()}
                    </p>
                </div>

                <div className={"flex items-center gap-x-1"}>
                    <CurrencyRupeeIcon className="w-4 h-4"/>
                    <p className="text-xs font-semibold leading-none text-right text-gray-800">
                        {formatCurrency(props.post.salary_low)} - {formatCurrency(props.post.salary_low)}
                    </p>
                </div>

            </div>
        </td>
    </tr>;
}

export default PostManagerList;
