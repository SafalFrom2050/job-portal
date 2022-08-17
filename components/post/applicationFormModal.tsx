import React, {useContext, useState} from 'react';
import FileInputWithDragDrop from "../inputs/fileInputWithDragDrop";
import {XIcon} from "@heroicons/react/solid";
import PrimaryButton from "../buttons/primaryButton";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import * as yup from "yup";
import {useFormik} from "formik";
import {createApplication} from "../../API/application.api";
import {Application} from "../../@types/application";
import {AlertContextType} from "../../@types/alert";
import {AlertContext} from "../../contexts/alertContext";
import {ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING} from "../../constants";
import axios, {AxiosError} from "axios";
import Router from "next/router";

function ApplicationFormModal(props: {
    show: boolean,
    setShow: (v: boolean) => void,
    postId: string,
}) {

    const {show, setShow} = props
    const [errorMsg, setErrorMsg] = useState(false as false | string)
    const [isCreatingApplication, setIsCreatingApplication] = useState(false as boolean)


    const {setAlert} = useContext(AlertContext) as AlertContextType;
    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType
    const {user} = useContext(AuthContext) as AuthContextType;


    const validationSchema = yup.object({
        cv: yup
            .mixed()
            .required(),
        cover_letter: yup
            .mixed()
            .required(),
        post: yup
            .string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            cv: undefined,
            cover_letter: undefined,
            post: props.postId
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateCreateApplication()
        },
    })

    async function initiateCreateApplication() {
        if (axiosInstance == null) return false

        const application: Application = {...user, ...formik.values}

        setIsCreatingApplication(true)

        try {
            const response = await createApplication(axiosInstance, application)

            console.log(response)
            setIsCreatingApplication(false)

            if (response.status == 201) {
                // Success
                setAlert({
                    type: ALERT_TYPE_SUCCESS,
                    title: "Your application has been submitted for review.",
                    duration: 20000
                })
                setShow(false)
            }

        } catch (error) {
            setIsCreatingApplication(false)

            if (axios.isAxiosError(error)) {
                console.log("axios error: ", error)

                const e = error as AxiosError
                if (e.response?.status === 400) {
                    const applicationErrors = e.response?.data as Application
                    formik.setErrors(applicationErrors)

                    Object.keys(applicationErrors).map((fieldName) => {
                        if (!Object.keys(formik.values).includes(fieldName)) {
                            setAlert({
                                type: ALERT_TYPE_WARNING,
                                title: "Profile Incomplete",
                                message: `Please update your profile details. Missing detail: '${fieldName}'`,
                                action: () => {
                                    Router.replace('/account')
                                },
                                actionButtonText: 'Account',
                                duration: 8000
                            })
                        }
                    })


                } else if (e.response?.status === 401) {
                    if (e.response?.data != null) {
                        setErrorMsg((e.response?.data as { details: string }).details)
                    }
                } else {
                    console.log("Unknown Network error: ", e)
                }
            }
        }
    }

    return (
        <form>
            {show && <div
                className="py-12 flex items-center bg-gray-50 bg-opacity-50 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0"
                id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div
                        className="relative py-4 px-8 md:px-8 bg-white shadow-md rounded">

                        <h3 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Your
                            Details</h3>
                        <div className="flex flex-col sm:flex-row justify-center w-full gap-x-2">

                            {formik.touched.cv && formik.errors.cv &&
                                <p className={'text-red-400 text-xs capitalize'}>{formik.errors.cv}</p>}
                            <FileInputWithDragDrop name={"cv"} message={"Drop your CV here"}
                                                   onFileChanged={(file) => formik.setFieldValue('cv', file)}/>

                            {formik.touched.cover_letter && formik.errors.cover_letter &&
                                <p className={'text-red-400 text-xs capitalize'}>{formik.errors.cover_letter}</p>}
                            <FileInputWithDragDrop name={"cover_letter"} message={"Drop your Cover Letter here"}
                                                   onFileChanged={(file) => formik.setFieldValue('cover_letter', file)}/>

                        </div>

                        <div className={'flex gap-x-2 items-center'}>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Your
                                profile information will be used to apply to this job.</p>
                            <PrimaryButton
                                onClick={formik.submitForm}
                                cClass={'ml-auto'}
                                class="font-medium text-sm"
                                name={"Submit"}
                                disabled={isCreatingApplication}
                            />
                        </div>

                        {/*Cross Icon*/}
                        <XIcon onClick={() => setShow(!show)}
                               className={'w-5 h-5 cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out'}/>

                    </div>
                </div>
            </div>}
        </form>
    );
}

export default ApplicationFormModal;