import React from "react";

const Index = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="lg:w-10/12 w-full">
                <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">25
                    Awesome Examples of About Us Pages</h2>
                <p className="font-normal text-base leading-6 text-gray-600 mt-6">The About Us page of your website is
                    an essential source of information for all who want to know more about your business.</p>
            </div>

            <div className="lg:mt-14 sm:mt-10 mt-12">
                <img className="lg:block hidden w-full" src="https://i.ibb.co/GvwJnvn/Group-736.png"
                     alt="Group of people Chilling"/>
                <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
                     alt="Group of people Chilling"/>
                <img className="sm:hidden block w-full" src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
                     alt="Group of people Chilling"/>
            </div>

            <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
                <div className="w-full xl:w-5/12 lg:w-6/12">
                    <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Our Story</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-4">Every business has an origin story
                        worth telling, and usually, one that justifies why you even do business and have clients.</p>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-6">Some centennial enterprises have
                        pages of content that can fit in this section, while startups can tell the story of how the
                        company was born, its challenges, and its vision for the future.</p>

                    <h2 className="mt-6 font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Our
                        Services</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-4">Of course, you have a homepage and
                        dedicated pages for your products, but summarizing your offerings on the About Us page is
                        crucial to tie them in with brand values in your messaging.</p>
                    <p className="font-normal text-base leading-6 text-gray-600 mt-6">Highlight the benefits and
                        showcase what you do (and why it is unique).</p>

                </div>


                <div className="relative rounded overflow-hidden px-4 w-full xl:w-5/12 lg:w-6/12">
                    <iframe className={"absolute top-0 left-0 right-0 bottom-0 w-full h-full"}
                        src="https://www.youtube.com/embed/CBRwF0LU3Ys"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                </div>

            </div>
        </div>
    );
};

export default Index;
