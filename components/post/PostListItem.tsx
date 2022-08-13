import React, {useState} from 'react';
import {Post} from "../../API/post.api";
import moment from "moment";
import Link from "next/link"
import Image from "next/image";
import WhiteButton from "../buttons/whiteButton";
import {BASE_URL, IMAGE_COMPANY_PLACEHOLDER} from "../../others/config";
import {CurrencyRupeeIcon, LocationMarkerIcon} from "@heroicons/react/solid";
import {formatCurrency} from '../../others/helpers';
import {ClockIcon} from "@heroicons/react/outline";

function PostListItem(props: {
    post: Post
}) {

    const {post} = props
    const [imageUrl, setImageUrl] = useState(post.author?.avatar ? BASE_URL + post.author?.avatar.substring(1) : IMAGE_COMPANY_PLACEHOLDER);

    return (
        <div>
            <div
                className="flex flex-col md:mx-auto rounded bg-white overflow-hidden p-4 gap-8"
            >
                <div className='w-full flex gap-x-4 items-center'>
                    <div className={'relative h-12 w-12 rounded-full bg-gray-200 overflow-hidden object-cover'}>
                        <Image
                            onError={(e)=>{
                                console.log("error:")
                                console.log(e)
                            }}
                            layout={'fill'}
                            className={"z-0"}
                            objectFit={'cover'}
                            placeholder={'blur'}
                            blurDataURL={IMAGE_COMPANY_PLACEHOLDER}
                            loading={'lazy'}
                            onLoadingComplete={(r)=>{
                                console.log('loaded: '+r)
                            }}

                            // src={IMAGE_COMPANY_PLACEHOLDER}
                            src={imageUrl}

                        />
                    </div>

                    <div className='flex-1 flex flex-col items-start'>
                        <h2 className="text-lg font-semibold truncate w-4/5">{post.title}</h2>
                        {moment(post.created_date).isValid() &&
                            <p className="text-xs text-gray-600 flex gap-x-2">
                                <ClockIcon className={'w-4 h-4 ml-auto'} />
                                {moment(post.created_date).fromNow()}
                            </p>
                        }
                    </div>
                </div>

                {/* Details */}
                <div className='flex flex-col gap-y-2'>
                    {/* Chips */}
                    <div className="flex">
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

                    {/* Location */}
                    <div className="flex flex-col md:flex-row gap-2 md:items-center py-2 text-indigo-700 text-xs">
                        <LocationMarkerIcon className={'w-4 h-4'} />
                        <h2 className="font-semibold truncate">{post.location}</h2>
                    </div>

                    {/* Salary and Btn */}
                    <div className={"flex items-center gap-1 text-indigo-600 text-sm"}>
                        <CurrencyRupeeIcon className={"w-4 h-4"} />
                        <h3 className="font-normal truncate">
                            {formatCurrency(post.salary_low)} - {formatCurrency(post.salary_high)}
                        </h3>
                        <div className={"ml-auto"}>
                            <Link href={`/post/${post.id}`}>
                                <a>
                                    <WhiteButton
                                        name={"View"}
                                        class={"bg-indigo-50 border border-indigo-300 text-sm font-medium"}
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostListItem;