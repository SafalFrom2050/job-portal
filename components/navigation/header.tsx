import Link from "next/link";
import React, {useState} from "react";

export default function Header(props: { guest?: boolean }) {

    let arr = [false]
    const [style, setStyle] = useState(arr);
    const [dropDown, setDropDown] = useState(true);
    const [text, setText] = useState("Home");

    const selected = (props: any) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = false;
        }
        newArr[props] = true;
        setStyle(newArr);
    }

    const setSelectedText = (txt: string) => {
        setText(txt);
        setDropDown(true);
    }

    const navItems = [
        {
            name: 'Help Guidance',
            path: '/help'
        },
        {
            name: 'Jobs',
            path: '/jobs'
        },
        {
            name: 'Hire Staff',
            path: '/post/create'
        },
        {
            name: 'Admission',
            path: '/admission'
        },
        {
            name: 'Top Staff',
            path: '/staff/top'
        },
        {
            name: 'Student Services',
            path: '/student-services'
        },
        {
            name: 'Training',
            path: '/training'
        },
        {
            name: 'Intern',
            path: '/intern'
        },

    ]

    return (
        <div className="2xl:container 2xl:mx-auto w-full">
            <div className="bg-white rounded py-5 px-7">
                <nav className="flex justify-between">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">

                        <Link href={'/'}>
                            <a onClick={() => selected(-1)}>
                                <h2 className="font-normal text-2xl leading-6 text-gray-800">Job Portal</h2>
                            </a>
                        </Link>
                    </div>
                    {/* For medium and plus-sized devices */}
                    <ul className="hidden md:flex flex-auto space-x-2">
                        {!props.guest &&
                            <>

                                {navItems.map((navItem, i) => (
                                    <Link key={i} href={navItem.path}>
                                        <li
                                            onClick={() => selected(i)}
                                            className={`${style[i] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}>
                                            {navItem.name}
                                        </li>
                                    </Link>
                                ))}
                            </>
                        }
                        <li onClick={() => selected(8)}
                            className={`${style[8] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}>About
                            Us
                        </li>

                    </ul>
                    {!props.guest && <>
                        <div className=" flex space-x-5 justify-center items-center pl-2">
                            <Link href={'/register'}>
                                <button>Register</button>
                            </Link>

                            <Link href={'/login'}>
                                <button>Login</button>
                            </Link>
                        </div>
                    </>
                    }
                </nav>
                {/* for smaller devices */}
                <div className="block md:hidden w-full mt-5 ">
                    <div onClick={() => setDropDown(!dropDown)}
                         className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full">
                        <div className="flex space-x-2">
                            <span id="s1"
                                  className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}>{text}</span>
                        </div>
                        <svg id="ArrowSVG" className={`${dropDown ? '' : 'rotate-180'} transform duration-100`}
                             width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className=" relative  z-50">
                        <ul id="list"
                            className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md bg-white`}>
                            <li onClick={() => setSelectedText("Arts")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Help
                                Guidance
                            </li>
                            <li onClick={() => setSelectedText("Jobs")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Jobs
                            </li>
                            <li onClick={() => setSelectedText("Hire Teacher")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Hire
                                Teacher
                            </li>
                            <li onClick={() => setSelectedText("Admission")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Admission
                            </li>
                            <li onClick={() => setSelectedText("Student Service")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Student
                                Service
                            </li>
                            <li onClick={() => setSelectedText("Training")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Training
                            </li>
                            <li onClick={() => setSelectedText("Intern")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Intern
                            </li>
                            <li onClick={() => setSelectedText("About Us")}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">About
                                Us
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}
