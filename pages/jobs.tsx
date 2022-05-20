import React, {useContext} from 'react';
import Heading from "../components/common/heading";
import Spinner from "../components/common/spinner";
import {searchStates} from "../components/index/search";
import PostListItem from "../components/post/PostListItem";
import {AxiosContext} from "../contexts/axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import {useQuery} from "react-query";
import {getPosts, Post} from "../API/post.api";

function Jobs() {
    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery("posts", fetchPosts, {enabled: axiosInstance != null, retryOnMount: true})

    const posts = data?.data.results as Post[]

    function fetchPosts() {
        return getPosts(axiosInstance)
    }
    
    return (
        <main className={"container mx-auto max-w-[1000px]"}>

                <Heading heading={"All Jobs"} count={posts ? posts.length : 0} sort={true} cClass={"sticky top-0 bg-indigo-50"} />

            {isLoading && <Spinner/>}

            <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                {posts?.map((post, i) => (
                        <PostListItem key={i} post={post}/>
                    ))
                }

            </div>
        </main>

    );
}

export default Jobs;