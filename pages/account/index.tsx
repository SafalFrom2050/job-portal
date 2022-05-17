import React from 'react';
import Heading from "../../components/common/heading";
import ManageBasicInfo from "../../components/account/manageBasicInfo";
import EditProfilePicture from "../../components/account/editProfilePicture";
import ToggleWithDetails from "../../components/inputs/toggleWithDetails";
import ToggleCheckbox from "../../components/inputs/toggleCheckbox";
import EditCanShiftLocation from "../../components/account/editCanShiftLocation";
import EditIsOrganization from "../../components/account/editIsOrganization";
import EditIsAvailableToWork from "../../components/account/editIsAvailableToWork";
import ManageMoreInfo from "../../components/account/manageMoreInfo";

function Index() {

    return (
        <div className={"p-4"}>
            <Heading heading={"Manage Account"}/>

            <EditProfilePicture/>


            <ManageBasicInfo/>
            <ManageMoreInfo />

            <div className={"max-w-[800px] mx-auto grid grid-cols-2 gap-4 mt-4"}>

                <EditCanShiftLocation />

                <EditIsOrganization />

                <EditIsAvailableToWork />


            </div>
        </div>
    );
}

export default Index;