import React, {useContext} from 'react';
import {useQuery} from "react-query";
import {Post, searchPosts} from "../API/post.api";
import {AxiosContext} from "../contexts/axiosContext";
import {AxiosContextType} from "../@types/axiosContextType";
import Heading from "../components/common/heading";
import Spinner from "../components/common/spinner";
import PostListItem from "../components/post/PostListItem";

function Training() {

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {data, isLoading} = useQuery("posts_with_type_training: ", () => searchPosts(axiosInstance, {position: "3"}), {enabled: !!axiosInstance})

    const posts = data?.data.results as Post[]

    return (
        <main className={"container mx-auto max-w-[1000px]"}>

            <Heading heading={"Training Jobs"} count={posts ? posts.length : 0} sort={true} cClass={"sticky top-0 bg-indigo-50"} />

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

export default Training;