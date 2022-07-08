import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import {TokenContext} from "../../contexts/tokenContext";
import {TokenContextType} from "../../@types/token";
import Router, {useRouter} from "next/router";
import Image from "next/image";
import {APP_NAME, BASE_URL} from "../../others/config";
import {LockClosedIcon} from "@heroicons/react/solid";

export default function Header(props: { guest?: boolean }) {

    const {pathname} = useRouter()
    let arr = [false]
    const [style, setStyle] = useState(arr);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const {user, isLoggedIn, syncUser} = useContext(AuthContext) as AuthContextType;
    const {saveToken} = useContext(TokenContext) as TokenContextType;


    const selected = (props: any) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = false;
        }
        newArr[props] = true;
        setStyle(newArr);
    }


    const navItems = [
        {
            name: 'Help',
            path: '/help'
        },
        {
            name: 'Search Jobs',
            path: '/search'
        },
        {
            name: 'Hire Staff',
            path: '/hire'
        },
        // {
        //     name: 'Admission',
        //     path: '/admission'
        // },
        {
            name: 'Top Staff',
            path: '/staff/top'
        },
        {
            name: 'Student Services',
            path: '/studentServices'
        },
        // {
        //     name: 'Training',
        //     path: '/training'
        // },
        // {
        //     name: 'Intern',
        //     path: '/intern'
        // },
    ]

    function logout() {
        // Local storage cannot have null values
        saveToken({access: "", refresh: ""})
        syncUser()
        Router.replace('/login')
    }

    useEffect(() => {
        navItems.map((navItem, i)=>{
            if (navItem.path === pathname) {
                selected(i)
            }
        })

        if (pathname === '/about') {
            selected(8)
        }
    }, [pathname]);


    return (
        <div className="relative 2xl:container 2xl:mx-auto w-full">
            <div className="bg-white rounded py-5 px-7">
                <nav className="flex justify-between">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">

                        <Link href={'/'}>
                            <a onClick={() => selected(-1)}>
                                <h2 className="font-normal text-2xl leading-6 text-gray-800">{APP_NAME}</h2>
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
                                            className={`${style[i] ? 'text-white bg-indigo-600 truncate' : 'text-gray-600 border border-white bg-gray-50'}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded truncate`}>
                                            {navItem.name}
                                        </li>
                                    </Link>
                                ))}
                            </>
                        }
                        <Link href={"/about"}>
                            <li onClick={() => selected(8)}
                                className={`${style[8] ? 'text-white bg-indigo-600 truncate' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded truncate`}>
                                About Us
                            </li>
                        </Link>

                    </ul>
                    {isLoggedIn ? <>
                            <div className=" flex space-x-5 justify-center items-center pl-2">
                                <button onClick={() => setShowAccountMenu(true)}>
                                    <div
                                        className="relative h-8 w-8 mb-4 lg:mb-0 mr-4 rounded-full overflow-hidden shadow hover:outline hover:outline-indigo-700 hover:outline-2">

                                        <Image
                                            layout={'fill'}
                                            src={user && user.avatar ? BASE_URL + user.avatar?.substring(1) : "/images/default-profile.png"}
                                            alt={'profile picture'}
                                        />
                                    </div>
                                </button>
                            </div>
                        </>
                        : <Link href={'/login'}>
                            <a className={'text-indigo-700 flex items-center gap-x-1'}>
                                <LockClosedIcon className={'w-5 h-5'}/>
                                <p className={"text-sm font-medium text-indigo-800"}>Login</p>
                            </a>
                        </Link>
                    }
                </nav>

                {isLoggedIn && showAccountMenu && <>
                    <div className={"fixed bottom-0 top-0 left-0 right-0 z-50"}
                         onClick={() => setShowAccountMenu(false)}/>

                    <div
                        className="z-[51] w-36 absolute transition duration-150 ease-in-out right-4 top-20 shadow-lg bg-white rounded">
                        <svg className="absolute -mt-2 top-0 w-full" width="9px" height="16px" viewBox="0 0 9 16"
                             version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#FFFFFF">
                                    <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                        <g id="Group-2" transform="translate(50.000000, 0.000000)">
                                            <polygon id="Triangle"
                                                     transform="translate(4.500000, 4.500000) translate(-4.500000, -4.500000) "
                                                     points="4.5 57.5 12.5 66.5 -3.5 66.5"/>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <Link href={"/account"} passHref={true}>
                            <div className={"p-4 cursor-pointer hover:bg-gray-100"}
                                 onClick={() => setShowAccountMenu(false)}><p
                                className={"text-xs font-medium text-gray-800"}>Manage Account</p></div>
                        </Link>

                        <div className={"p-4 cursor-pointer hover:bg-gray-100"} onClick={logout}><p
                            className={"text-xs font-medium text-gray-800"}>Logout</p></div>
                    </div>
                </>
                }

                {/* for smaller devices */}
                {/*<div className="block md:hidden w-full mt-5 ">*/}
                {/*    <div onClick={() => setDropDown(!dropDown)}*/}
                {/*         className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full">*/}
                {/*        <div className="flex space-x-2">*/}
                {/*            <span id="s1"*/}
                {/*                  className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}>{text}</span>*/}
                {/*        </div>*/}
                {/*        <svg id="ArrowSVG" className={`${dropDown ? '' : 'rotate-180'} transform duration-100`}*/}
                {/*             width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"*/}
                {/*                  strokeLinejoin="round"/>*/}
                {/*        </svg>*/}
                {/*    </div>*/}
                {/*    <div className=" relative  z-50">*/}
                {/*        <ul id="list"*/}
                {/*            className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md bg-white`}>*/}

                {/*            {navItems.map((navItem, i) => (*/}
                {/*                <Link key={i} href={navItem.path}>*/}
                {/*                    <li onClick={() => setSelectedText(navItem.name)}*/}
                {/*                        className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">*/}
                {/*                        {navItem.name}*/}
                {/*                    </li>*/}
                {/*                </Link>*/}
                {/*            ))}*/}

                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>

    );
}
