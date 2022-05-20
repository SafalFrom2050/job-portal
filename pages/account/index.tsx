import React, {useContext} from 'react';
import Heading from "../../components/common/heading";
import ManageBasicInfo from "../../components/account/manageBasicInfo";
import EditProfilePicture from "../../components/account/editProfilePicture";
import EditCanShiftLocation from "../../components/account/editCanShiftLocation";
import EditIsOrganization from "../../components/account/editIsOrganization";
import EditIsAvailableToWork from "../../components/account/editIsAvailableToWork";
import ManageStaffInfo from "../../components/account/manageStaffInfo";
import ManageOrganizationInfo from "../../components/account/manageOrganizationInfo";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";

function Index() {

    const {user} = useContext(AuthContext) as AuthContextType;
    console.log(user)
    return (
        <div className={"p-4"}>
            <Heading heading={"Manage Account"}/>

            <EditProfilePicture/>


            <ManageBasicInfo/>
            <div className={"max-w-[800px] mx-auto grid grid-cols-1 gap-4 mt-4"}>
                <EditIsOrganization/>
            </div>

            {user.is_organization ? <ManageOrganizationInfo/>
                : <ManageStaffInfo/>
            }

            <div className={"max-w-[800px] mx-auto grid grid-cols-2 gap-4 mt-4"}>

                <EditCanShiftLocation/>

                <EditIsAvailableToWork/>

            </div>
        </div>
    );
}

export default Index;