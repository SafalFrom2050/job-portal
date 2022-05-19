import React from "react";
import Heading from "../../components/common/heading";
import PrimaryButton from "../../components/buttons/primaryButton";
function Index() {


    return (
        <>
            <div className="2xl:container mx-auto w-full py-8">

                <div className="container mx-auto flex items-start justify-center">
                    <div className="w-full p-2">
                        {/* Card is full width. Use in 12 col grid for best view. */}
                        {/* Card code block start */}
                        <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 rounded">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">Job Posting For XYZ Engineer</h1>
                                <div className="flex flex-col md:flex-row items-start md:items-center md:w-full justify-end gap-x-4">
                                    <div className="mt-4 lg:mt-0 mr-0 xl:mr-8 text-sm bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium py-2 w-48 flex justify-center">Posted Date: 21 May, 2022</div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <div className="w-full lg:w-2/3 pr-0">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded">
                                            <img className="w-full h-full overflow-hidden object-cover rounded object-center" src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png" alt="logo" />
                                        </div>
                                        <div className="ml-2">
                                            <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">XYZ Company</h5>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">Kathmandu, Nepal</p>
                                        </div>
                                    </div>
                                    <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 font-normal">Our global team uses AI, machine learning, automation, and other emerging technologies to collect and analyze billions of records. We provide advanced decision-support to prevent credit, lending, and cyber risks. In addition, we monitor and advise companies on complex global matters such as climate change, catastrophes, and geopolitical issues.</p>
                                </div>

                            </div>
                            <div className="relative">
                                <hr className="mt-8 mb-8 lg:mb-10 h-1 rounded bg-gray-200" />
                                <hr className="absolute top-0 h-1 w-2/3 rounded bg-indigo-400" />
                            </div>
                            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                                <div className="flex flex-col lg:flex-row w-full lg:w-2/3 items-start lg:items-center mb-8 lg:mb-0">
                                    <div className="mr-24 flex lg:block flex-row-reverse items-center mb-4 lg:mb-0">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Average Salary</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">Rs. 90,000</h2>
                                    </div>
                                    <div className="mr-24 flex lg:block flex-row-reverse items-center mb-4 lg:mb-0">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Job Posts</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">231</h2>
                                    </div>
                                    <div className="flex lg:block flex-row-reverse items-center">
                                        <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">Employees</h3>
                                        <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">4302</h2>
                                    </div>
                                </div>
                                <div className={"ml-auto"}>
                                    <PrimaryButton
                                        class={"text-base font-medium"}
                                        name={"Apply"} />
                                </div>
                            </div>
                        </div>
                        {/* Card code block end */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Index;
