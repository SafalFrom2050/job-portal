import Link from "next/link";
import React, {useState} from "react";
import {AcademicCapOutline, ChartBarOutline, PlusCircleOutline, SparklesOutline, SupportOutline} from "heroicons-react";

function BottomNav() {

    const navItems = [
        {
            name: 'Jobs',
            path: '/jobs',
            icon: <ChartBarOutline className={"h-6 w-6"} />
        },
        {
            name: 'Hire Staff',
            path: '/post/create',
            icon: <PlusCircleOutline className={"h-6 w-6"} />
        },
        // {
        //     name: 'Admission',
        //     path: '/admission',
        //     icon: <AcademicCapOutline className={"h-6 w-6"} />
        // },
        {
            name: 'Top Staff',
            path: '/staff/top',
            icon: <SparklesOutline className={"h-6 w-6"} />
        },
        {
            name: 'Student Services',
            path: '/studentServices',
            icon: <SupportOutline className={"h-6 w-6"} />
        },

    ]


    return (
        <div>
            <div
                className={"w-full fixed bottom-0 z-30 bg-gray-800 shadow flex-col justify-between md:hidden transition duration-150 ease-in-out transform -translate-x-0"}
                id="mobile-nav">

                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        {navItems.map((navItem, i) => (
                            <Link key={i} href={navItem.path}>
                                <li className="cursor-pointer text-white py-1 flex flex-col items-center justify-center w-2/12">
                                    {navItem.icon}
                                    <span className="text-[11px] text-center ">{navItem.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
