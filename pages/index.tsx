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


const Home: NextPage = () => {

    const [searchResults, setSearchResults] = useState([] as Post[]);
    const [isSearching, setIsSearching] = useState(searchStates.notSearching);

    const titleTypes = [
        {key: "1", value: "School/College"},
        {key: "2", value: "Security"},
        {key: "3", value: "IT"},
        {key: "4", value: "Banking"},
        {key: "5", value: "Receptionist"},
    ]

    const positionTypes = [
        {key: "1", value: "Teacher"},
        {key: "2", value: "Driver"},
        {key: "3", value: "Developer"},
        {key: "4", value: "Backend"}
    ]

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery("posts", fetchPosts, {enabled: axiosInstance != null, retryOnMount: true})

    const posts = data?.data.results as Post[]


    function fetchPosts() {
        return getPosts(axiosInstance)
    }

    return (
        <div>
            <Head>
                <title>{APP_NAME}</title>
                <meta name="description" content={APP_DESCRIPTION}/>
            </Head>

            <div className="w-full px-6 md:mb-16">
                <div
                    className="mt-8 relative rounded-lg bg-indigo-700 container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
                    <img className="mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0"
                         src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
                         alt="bg"/>
                    <img className="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0"
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
                {searchResults.length > 0 || isSearching ?
                    <Heading heading={"Search Results"} count={searchResults.length} sort={true}/>
                    :
                    <Heading heading={"All Jobs"} count={posts ? posts.length : 0} sort={true}/>
                }

                {isLoading && <Spinner/>}

                {isSearching === searchStates.searching &&
                    <div className={"flex gap-x-2 items-center justify-center w-28 mx-auto"}>
                        <Spinner/>

                        <p className={"font-normal"}>Searching</p>
                    </div>
                }

                <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    {searchResults.length > 0 || isSearching ?
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

        </div>
    )
}

export default Home
