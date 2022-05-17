import React from 'react';
import Head from "next/head";
import {APP_DESCRIPTION, APP_NAME} from "../others/config";
import Heading from "../components/common/heading";
import NavigationGrid from "../components/studentServices/navigationGrid";

function StudentServices() {
    return <>
            <Head>
                <title>{APP_NAME}</title>
                <meta name="description" content={APP_DESCRIPTION}/>
            </Head>

        <main>
            <Heading heading={"Student Services"}/>

            <NavigationGrid />
        </main>
        </>
}

export default StudentServices;