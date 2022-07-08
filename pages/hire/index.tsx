import React, {useState} from 'react';
import TabView from "../../components/navigation/tabView";
import Create from "../post/create";
import PostManagerList from "../../components/post/PostManagerList";

function Index() {
    const tabs = [
        {key: 0, value: 'Create Post'},
        {key: 1, value: 'Manage Posts'},
    ]

    const [tabKey, setTabKey] = useState(0)


    return <>
        <div
            className="relative bg-indigo-700 mx-auto flex flex-col items-center pt-8 sm:pt-16 pb-16 sm:pb-16 md:pb-24 xl:pb-32">

            <img className="mr-6 lg:mr-16 mt-6 lg:mt-16 absolute right-0 top-0"
                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
                 alt="bg"/>
            <img className="ml-6 lg:ml-16 mb-6 lg:mb-16 absolute bottom-0 left-0"
                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg"
                 alt="bg"/>
            <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold">
                    We Can Help You You Find the Right Staff For Your Business
                </h1>
            </div>

        </div>

        <TabView tabs={tabs} onTabChange={setTabKey} />

        <div className={"h-4"} />

        {tabKey === 0 && <Create />}
        {tabKey === 1 && <PostManagerList />}

    </>
}

export default Index;