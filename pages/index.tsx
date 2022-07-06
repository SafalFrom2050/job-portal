import type {NextPage} from 'next'
import Head from 'next/head'
import Search, {searchStates} from "../components/index/search";
import PostListItem from "../components/post/PostListItem";
import React, {useContext, useEffect, useState} from "react";
import {AxiosContext} from "../contexts/axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import {getPosts, Post, SearchPostRequest} from "../API/post.api";
import {useQuery} from "react-query";
import Spinner from "../components/common/spinner";
import Heading from "../components/common/heading";
import {APP_DESCRIPTION, APP_NAME} from "../others/config";
import Router from "next/router";
import Pagination from "../components/navigation/pagination";


const Home: NextPage = () => {

    const [postDataUrl, setPostDataUrl] = useState('post/');
    const [postsCount, setPostsCount] = useState(6)
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const [searchResults, setSearchResults] = useState([] as Post[]);
    const [isSearching, setIsSearching] = useState(searchStates.notSearching);

    const {axiosInstanceGuest} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery(postDataUrl, fetchPosts, {
        enabled: axiosInstanceGuest != null,
        retryOnMount: true
    })

    const posts = (data?.data ? data?.data.results : []) as Post[]

    const count = data?.data ? data?.data.count : 0
    const nextPostData: string = data?.data ? data?.data.next : undefined
    const previousPostData: string = data?.data ? data?.data.previous : undefined


    function fetchPosts() {
        return getPosts(axiosInstanceGuest, {url: postDataUrl, limit: postsCount})
    }

    function setNextPosts() {
        if (nextPostData != undefined) {
            setPostDataUrl(nextPostData)
            setCurrentPageNumber((i) => ++i)
        }

    }

    function setPreviousPosts() {
        if (previousPostData != undefined) {
            setPostDataUrl(previousPostData)
            setCurrentPageNumber((i) => --i)
        }
    }

    function setPageNumber(pageNumber: number) {
        setPostDataUrl(`post/?limit=${postsCount}&offset=${(pageNumber - 1) * postsCount}`)
        setCurrentPageNumber(pageNumber)
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

                    <img className="mr-6 lg:mr-16 mt-6 lg:mt-16 absolute right-0 top-0"
                         src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
                         alt="bg"/>
                    <img className="ml-6 lg:ml-16 mb-6 lg:mb-16 absolute bottom-0 left-0"
                         src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg"
                         alt="bg"/>
                    <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">Find
                            Your Dream Job In Simple Steps</h1>
                    </div>

                </div>
                <div className="container mx-auto flex justify-center md:-mt-72 -mt-32 sm:-mt-56">
                    <Search onSearchResults={setSearchResults}
                            onSearchStateChange={setIsSearching}
                            onSearchError={(e) => {
                            }}/>
                </div>
            </div>

            <main className={"container mx-auto max-w-[1000px]"}>
                {searchResults.length > 0 || isSearching === searchStates.searching || isSearching === searchStates.end ?
                    <Heading heading={"Search Results"}
                             showBackButton
                             backButtonAction={() => Router.push('/')}
                             count={searchResults.length}
                             sort={true}
                             cClass={"sticky top-0 bg-indigo-50"}/>
                    :
                    <Heading heading={"All Jobs"} count={count || 0} sort={true}
                             cClass={"sticky top-0 bg-indigo-50"}/>
                }

                {isLoading && <Spinner/>}

                {isSearching === searchStates.searching &&
                    <div className={"flex gap-x-2 items-center justify-center w-28 mx-auto"}>
                        <Spinner/>

                        <p className={"font-normal"}>Searching</p>
                    </div>
                }

                <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    {searchResults.length > 0 || isSearching === searchStates.searching || isSearching === searchStates.end ?
                        searchResults.map((post, i) => (
                            <PostListItem key={i} post={post}/>
                        ))
                        :
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

export default Home
