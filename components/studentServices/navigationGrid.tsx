import React from 'react';
import {overrideTailwindClasses} from "tailwind-override";
import {AcademicCapOutline} from "heroicons-react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBurst,
    faChalkboardTeacher,
    faPersonChalkboard,
    faPersonMilitaryPointing,
    faSchoolCircleCheck
} from '@fortawesome/free-solid-svg-icons'

import Link from "next/link";

function NavigationGrid() {

    const navItems = [
        {
            name: "Admission",
            path: "/",
            icon: <AcademicCapOutline className={"w-8 h-8"}/>
        },
        {
            name: "Tuition",
            path: "/",
            icon: <FontAwesomeIcon icon={faPersonChalkboard} className={"w-8 h-8"}/>
        },
        {
            name: "Online Class",
            path: "/",
            icon: <FontAwesomeIcon icon={faChalkboardTeacher} className={"w-8 h-8"}/>
        },
        {
            name: "Training",
            path: "/",
            icon: <FontAwesomeIcon icon={faPersonMilitaryPointing} className={"w-8 h-8"}/>
        },
        {
            name: "Accessories",
            path: "/",
            icon: <FontAwesomeIcon icon={faBurst} className={"w-8 h-8"}/>
        },
        {
            name: "Free Education",
            path: "/education",
            icon: <FontAwesomeIcon icon={faSchoolCircleCheck} className={"w-8 h-8"}/>
        },
    ]

    return (
        <div
            className={overrideTailwindClasses(`mx-auto py-1 px-4 2xl:mx-auto flex justify-center items-center max-w-[800px]`)}>
            <div className="w-full grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">

                {navItems.map((navItem, i) => (
                    <Link key={i} href={navItem.path}>
                        <div className="cursor-pointer hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 rounded shadow px-6 py-4 flex items-center">
                            <div className="p-3 bg-indigo-700 rounded text-white">
                                {navItem.icon}
                            </div>
                            <div className="mx-6">
                                <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-base">{navItem.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavigationGrid;