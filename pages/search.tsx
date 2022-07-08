import React, {useContext, useEffect, useState} from 'react';
import {getPosts, Post, PostRequestOptions} from "../API/post.api";
import {AxiosContext} from "../contexts/axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import {useQuery} from "react-query";
import Head from "next/head";
import {APP_DESCRIPTION, APP_NAME} from "../others/config";
import Heading from "../components/common/heading";
import Router, {useRouter} from "next/router";
import Spinner from "../components/common/spinner";
import PostListItem from "../components/post/PostListItem";
import Pagination from "../components/navigation/pagination";
import * as yup from "yup";
import {useFormik} from "formik";
import {smoothScrollTop} from "../others/helpers";
import Search from "../components/index/search";

function SearchPage() {

    const router = useRouter()
    const {query} = router


    const [postDataUrl, setPostDataUrl] = useState('post/');

    const [postsCount, setPostsCount] = useState(20)

    const [postDataOptions, setPostDataOptions] = useState({url: postDataUrl, limit: postsCount, ...query} as PostRequestOptions)

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
        router.push({pathname: '/search', query: options as any})

        setPostDataOptions({...postDataOptions, ...options})
        smoothScrollTop()
    }

    return (
        <div>
            <Head>
                <title>{APP_NAME}</title>
                <meta name="description" content={APP_DESCRIPTION}/>
            </Head>

            <div className="w-full md:mb-16">
                <div
                    className="relative bg-indigo-700 mx-auto flex flex-col items-center pt-8 sm:pt-16 pb-16 sm:pb-24 md:pb-52 xl:pb-56">


                </div>
                <div className="container mx-auto flex justify-center md:-mt-72 -mt-32 sm:-mt-40">
                    <Search onSubmit={setSearchOptions} searchPostRequestOptions={query} isFullSize={true}/>
                </div>
            </div>

            <main className={"container mx-auto max-w-[1000px]"}>

                <Heading heading={"Search Results"}
                         showBackButton
                         backButtonAction={() => Router.push('/')}
                         count={count}
                         sort={true}
                         cClass={"sticky top-0 bg-indigo-50"}/>


                {isLoading &&
                    <div className={"flex gap-x-2 items-center justify-center w-28 mx-auto"}>
                        <Spinner/>

                        <p className={"font-normal"}>Searching</p>
                    </div>
                }

                <div className="mx-4 mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    {
                        posts?.map((post, i) => (
                            <PostListItem key={i} post={post}/>
                        ))
                    }

                </div>
            </main>

            <Pagination
                onNextClick={setNextPosts}
                onPreviousClick={setPreviousPosts}
                count={Math.ceil(count / postsCount)}
                currentPageNumber={currentPageNumber}
                onPageNumberClick={setPageNumber}
                disableNextButton={!nextPostData || isLoading}
                disablePreviousButton={!previousPostData || isLoading}

            />
        </div>
    )
}

export default SearchPage;