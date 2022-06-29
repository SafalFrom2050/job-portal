import React, {useState} from 'react';
import Image from "next/image";
import {
    BadgeCheckIcon,
    BriefcaseIcon,
    CurrencyRupeeIcon, DocumentDownloadIcon,
    LightningBoltIcon, MailIcon, PhoneIcon
} from "@heroicons/react/solid";
import PrimaryButton from "../../components/buttons/primaryButton";
import WhiteButton from "../../components/buttons/whiteButton";
import TextButton from "../../components/buttons/textButton";
import {MenuAlt3Icon, XIcon} from "@heroicons/react/outline";
import {overrideTailwindClasses} from "tailwind-override";

function ProfileListItem() {

    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

    function openQuickActions() {
        setIsQuickActionsOpen(true)
    }

    function closeQuickActions() {
        setIsQuickActionsOpen(false)
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
                    src={"https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
            </div>

            {/* Title and Position block */}
            <div className={"text-center mt-3"}>
                <h3 className={"text-gray-900 text-base font-medium"}>Safal Sharma</h3>
                <p className={"text-gray-400 text-sm"}>Software Engineer</p>
            </div>

            {/* Additional Details (Highlights) */}
            <div className={"flex gap-x-6 justify-between mt-9 mx-3"}>
                <p className={"flex gap-x-1 text-gray-600 text-xs font-normal inline"}><CurrencyRupeeIcon
                    className={"w-4 h-4"}/> 20,000 - 30,000</p>
                <p className={"flex gap-x-1 text-gray-700 text-xs font-medium inline"}><BriefcaseIcon
                    className={"w-4 h-4"}/> 3 years</p>

            </div>

            <div className={"mt-4 w-full"}>
                <WhiteButton name={"View Profile"}
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

                    <button className={"cursor-pointer"} onClick={closeQuickActions}>
                        <MailIcon className={"w-10 h-10 text-white transition-transform hover:scale-150"}/>
                    </button>

                    <button className={"cursor-pointer"} onClick={closeQuickActions}>
                        <PhoneIcon className={"w-10 h-10 text-white transition-transform hover:scale-150"}/>
                    </button>

                    <button className={"relative cursor-pointer transition-transform hover:scale-150"} onClick={closeQuickActions}>
                        <DocumentDownloadIcon className={"w-10 h-10 text-white "}/>
                        <p className={"absolute top-1 left-3 text-indigo-400 font-bold text-[8px]"}>CV</p>
                    </button>
                </div>
            </div>


        </div>
    );
}

export default ProfileListItem;