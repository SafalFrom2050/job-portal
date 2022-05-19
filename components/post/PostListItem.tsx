import React from 'react';
import {Post} from "../../API/post.api";
import moment from "moment";
import Router from "next/router";

function PostListItem(props: {
    post: Post
}) {

    const {post} = props

    return (
        <div className={"px-4"}>
            <div
                className="flex flex-col md:flex-row md:max-w-[800px] w-full md:mx-auto mt-3 rounded bg-white overflow-hidden">
                <div>
                    <img src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png"
                         className="w-full h-44 md:w-80 md:h-full object-cover"/>
                </div>
                <div className="w-full">

                    <div className="pt-6 p-4">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold">{post.position}</h2>
                            {moment(post.created_date).isValid() &&
                                <p className="text-xs text-gray-600 pl-5">Posted {moment(post.created_date).fromNow()}</p>
                            }
                        </div>
                        <p className="text-xs text-gray-600 mt-3">{post.description}</p>
                        <div className="flex mt-4">
                            <div>
                                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">{post.field?.name}</p>
                            </div>
                            <div className="hover:shadow cursor-pointer ml-2" onClick={()=>{Router.push('org/1')}}>
                                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">{`${post.author?.first_name} ${post.author?.last_name}`}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between py-4">
                            <h2 className="text-indigo-700 text-xs font-semibold">{post.location}</h2>
                            <h3 className="text-indigo-700 text-base font-semibold"><span
                                className="text-xs text-indigo-800">Salary: </span>Rs. {post.salary_low} -
                                Rs. {post.salary_high}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostListItem;