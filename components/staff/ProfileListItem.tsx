import React, {useState} from 'react';
import Image from "next/image";
import {
    BadgeCheckIcon,
    BriefcaseIcon,
    CurrencyRupeeIcon,
    DocumentDownloadIcon,
    MailIcon,
    PhoneIcon
} from "@heroicons/react/solid";
import WhiteButton from "../../components/buttons/whiteButton";
import {MenuAlt3Icon, XIcon} from "@heroicons/react/outline";
import {overrideTailwindClasses} from "tailwind-override";
import Router from "next/router";
import {User} from "../../@types/user";
import {formatCurrency} from "../../others/helpers";
import {BASE_URL} from '../../others/config';

function ProfileListItem(props: {user: User}) {

    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

    function openQuickActions() {
        setIsQuickActionsOpen(true)
    }

    function closeQuickActions() {
        setIsQuickActionsOpen(false)
    }

    function openProfilePage() {
        setIsQuickActionsOpen(false)
        Router.push(`/profile/${props.user.id}`)
    }

    return (
        <div
            className={"mx-auto relative flex flex-col items-center rounded bg-white shadow p-4 w-full max-w-[250px] overflow-hidden"}>

            <div className={"absolute top-4 left-4"}>
                <BadgeCheckIcon className={"w-6 h-6 text-green-600"}/>
                {/*<LightningBoltIcon className={"w-6 h-6"}/>*/}
            </div>

            <button className={"absolute top-4 right-4 cursor-pointer"} onClick={openQuickActions}>
                <MenuAlt3Icon className={"w-5 h-5 text-gray-600 transition-transform hover:scale-125"}/>
            </button>


            <div className={"relative w-24 h-24 rounded-full overflow-hidden"}>
                <Image
                    alt={"profile image"}
                    layout={"fill"}
                    src={props.user.avatar ? BASE_URL + props.user.avatar?.substring(1) : '/images/default-profile.png'}/>
            </div>

            {/* Title and Position block */}
            <div className={"text-center mt-3"}>
                <h3 className={"text-gray-900 text-base font-medium"}>{props.user.first_name} {props.user.last_name}</h3>
                <p className={"text-gray-400 text-sm"}>{props.user.position || 'Position Unspecified'}</p>
            </div>

            {/* Additional Details (Highlights) */}
            <div className={"flex gap-x-4 justify-between mt-9 mx-3"}>
                <p className={"flex gap-x-1 text-gray-600 text-xs font-normal inline"}><CurrencyRupeeIcon
                    className={"w-4 h-4"}/>{formatCurrency(props.user.expected_salary_low)} - {formatCurrency(props.user.expected_salary_high)}</p>
                <p className={"flex gap-x-1 text-gray-700 text-xs font-medium inline"}><BriefcaseIcon
                    className={"w-4 h-4"}/>{props.user.experience || 'unspecified'} years</p>

            </div>

            <div className={"mt-4 w-full"}>
                <WhiteButton name={"View Profile"}
                             onClick={()=> openProfilePage()}
                             class={"w-full mx-0 text-gray-800 font-medium border border-gray-600"}/>
            </div>

            <div
                className={overrideTailwindClasses(` text-white overflow-hidden absolute transition-all left-0 bottom-0 right-0 bg-indigo-400 h-0 w-full ${isQuickActionsOpen ? 'h-full w-full max-h-[1000px]' : ''}`)}>

                <div className={"absolute top-4 left-4"}>

                    <p className={"flex items-center gap-x-1 text-[10px] text-indigo-400 rounded-full hover:bg-white overflow-hidden transition-all pr-2"}><div className={"bg-indigo-400 rounded-full m-[1px]"}><BadgeCheckIcon className={"w-6 h-6 text-white"}/></div> Available</p>
                    {/*<LightningBoltIcon className={"w-6 h-6"}/>*/}
                </div>

                <button className={"absolute top-4 right-4 cursor-pointer"} onClick={closeQuickActions}>
                    <XIcon className={"w-6 h-6 text-white opacity-80 transition-transform hover:scale-125"}/>
                </button>

                <div className={"h-full w-full flex flex-col gap-y-4 items-center justify-center"}>

                    <a href={`mailto:${props.user.email}`} className={"cursor-pointer"} onClick={closeQuickActions}>
                        <MailIcon className={"w-10 h-10 text-white transition-transform hover:scale-150"}/>
                    </a>

                    <a href={`tel:${props.user.phone}`} className={"cursor-pointer"} onClick={closeQuickActions}>
                        <PhoneIcon className={"w-10 h-10 text-white transition-transform hover:scale-150"}/>
                    </a>

                    <a href={props.user.cv} className={"relative cursor-pointer transition-transform hover:scale-150"} onClick={closeQuickActions}>
                        <DocumentDownloadIcon className={"w-10 h-10 text-white "}/>
                        <p className={"absolute top-1 left-3 text-indigo-400 font-bold text-[8px]"}>CV</p>
                    </a>
                </div>
            </div>


        </div>
    );
}

export default ProfileListItem;