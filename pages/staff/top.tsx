import React, {useContext, useState} from 'react';

import ProfileListItem from "../../components/staff/ProfileListItem";
import Heading from "../../components/common/heading";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useQuery} from "react-query";
import {getPosts, Post} from "../../API/post.api";
import {getUsers} from "../../API/user.api";
import {User} from "../../@types/user";

function Top() {

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery("users", fetchUsers, {enabled: axiosInstance != null, retryOnMount: true})

    const users = (data?.data.results || []) as User[]

    console.log(users)
    function fetchUsers() {
        return getUsers(axiosInstance)
    }


    return (
        <>
            <Heading heading={"Top Staff"} cClass={"sticky top-0 bg-indigo-50"}/>
            <div className={"max-w-[990px] mx-auto"}>
                <div className={"grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"}>

                    {users.map((user, i)=>{
                        return <ProfileListItem key={i} user={user}/>
                    })}

                </div>
            </div>
        </>
    );
}

export default Top;