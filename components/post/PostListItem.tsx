import React from 'react';
import {Post} from "../../API/post.api";
import moment from "moment";
import Router from "next/router";
import Link from "next/link"
import WhiteButton from "../buttons/whiteButton";
import {BASE_URL, IMAGE_COMPANY_PLACEHOLDER} from "../../others/config";

function PostListItem(props: {
    post: Post
}) {

    const {post} = props

    return (
        <div>
            <div
                className="flex flex-col md:mx-auto rounded bg-white overflow-hidden">
                <div>
                    <img
                        src={post.author?.avatar ? BASE_URL + post.author?.avatar.substring(1) : IMAGE_COMPANY_PLACEHOLDER}
                        className="w-full h-44 object-cover"/>
                </div>
                <div className="w-full">

                    <div className="pt-6 p-4">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold truncate">{post.title}</h2>
                            {moment(post.created_date).isValid() &&
                                <p className="text-xs text-gray-600 pl-5 ml-auto text-right">{moment(post.created_date).fromNow()}</p>
                            }
                        </div>
                        {/*<p className="text-xs text-gray-600 mt-3">{post.description}</p>*/}

                        <div className="flex mt-4">
                            <div className={" px-2 bg-gray-200 rounded py-1"}>
                                {/*<p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">{post.field?.name}</p>*/}
                                <p className="text-xs text-gray-600 truncate ">{post.position}</p>
                            </div>
                            <Link href={{pathname: `org/${post.author?.id}`}}>
                                <div className="hover:shadow cursor-pointer px-2 bg-gray-200 rounded py-1 ml-2">
                                    <p className="text-xs text-gray-600 truncate ">{`${post.author?.first_name} ${post.author?.last_name}`}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between py-4">
                            <h2 className="text-indigo-700 text-xs font-semibold truncate">{post.location}</h2>

                        </div>
                    </div>
                    <div className={"pl-4 p-2 flex items-center justify-between"}>
                        <h3 className="text-indigo-600 text-sm font-normal truncate ">
                            {/*<span className="text-xs text-indigo-800"></span>*/}
                            Rs. {post.salary_low} - Rs. {post.salary_high}</h3>
                        {/*TODO: No id from API */}
                        <Link href={"/post/20"}>
                            <a>
                                <WhiteButton name={"View"} class={"bg-indigo-50 text-sm font-medium"}/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostListItem;