import type {NextPage} from 'next'
import Head from 'next/head'
import BottomNav from "../components/common/bottomNav";
import Dropdown from "../components/common/dropdown/dropdown";
import TextInput from "../components/inputs/textInput";
import Header from "../components/navigation/header";
import PrimaryButton from "../components/buttons/primaryButton";
import WhiteButton from "../components/buttons/whiteButton";
import Search from "../components/index/Search";
import PostListItem from "../components/post/PostListItem";
import {useContext} from "react";
import {AxiosContext} from "../contexts/axiosContext";
import {AxiosContextType} from "../@types/axiosInstance";
import {getPosts} from "../API/post.api";

const Home: NextPage = () => {

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

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    if (axiosInstance) {
        getPosts(axiosInstance).then((value)=>{
            console.log(value)
        })
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
            </Head>
            <Header />

            {/* Only in Mobile */}
            <BottomNav/>

            <div className={"flex flex-col justify-center w-full"}>


                <Search />
            </div>

            <main>
                <h2 className="max-w-[800px] mx-auto px-4 font-medium text-xl mt-6 text-gray-700">All Jobs</h2>
                <PostListItem />
            </main>

        </div>
    )
}

export default Home
