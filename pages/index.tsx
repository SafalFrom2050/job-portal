import type {NextPage} from 'next'
import Head from 'next/head'
import BottomNav from "../components/common/bottomNav";
import Dropdown from "../components/common/dropdown/dropdown";
import TextInput from "../components/inputs/textInput";
import Header from "../components/navigation/header";
import PrimaryButton from "../components/buttons/primaryButton";
import WhiteButton from "../components/buttons/whiteButton";

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
                <div className={"shadow rounded bg-white p-6 pb-2 flex flex-col gap-3 w-72 mx-auto mt-8"}>
                    <Dropdown options={titleTypes} onSelect={()=>false} label="Title/Type" />

                    <Dropdown options={positionTypes} onSelect={()=>false} label="Position/Post"/>

                    <TextInput  name="location" placeholder="Location" type="text" iClass="bg-white mt-0 text-sm px-5 font-medium text-gray-600 placeholder-gray-400"/>

                    <div className="flex w-full justify-center mt-auto">
                        <WhiteButton name="Add Filter" />

                        <PrimaryButton name="Search Job" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home
