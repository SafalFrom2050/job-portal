import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Index() {
    return (
        <div>
            <div className="flex items-center justify-center py-12">
                <div className="bg-white border rounded-md flex items-center justify-center mx-4 md:w-2/3 ">
                    <div className="flex flex-col items-center py-16 ">
                        <div className={'relative w-full h-36 p-4 md:p-10'}>
                            <Image
                                alt={'email verification illustration'}
                                layout={'fill'}
                                objectFit={'contain'}
                                src={"/images/email-verification.webp"}
                            />
                        </div>
                        <h1 className="px-4 pt-8 pb-4 text-center text-5xl font-bold text-gray-800">Email
                            Verification! </h1>
                        <p className="px-4 pb-10 text-base text-center text-gray-600">Please click on the verification
                            link that has been sent to your email address to verify your account </p>

                        <Link href={'/login'}>
                            <a>
                                <button
                                    className="mx-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Continue
                                    to Login
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;