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
import ProfileListItem from "../../components/staff/ProfileListItem";
import Heading from "../../components/common/heading";

function Top() {


    return (
        <>
            <Heading heading={"Top Staff"} cClass={"sticky top-0 bg-indigo-50"}/>
            <div className={"max-w-[990px] mx-auto"}>
                <div className={"grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"}>
                    <ProfileListItem/>
                    <ProfileListItem/>
                    <ProfileListItem/>
                    <ProfileListItem/>
                    <ProfileListItem/>

                </div>
            </div>
        </>
    );
}

export default Top;