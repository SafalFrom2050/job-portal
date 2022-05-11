import React, {useContext, useEffect, useState} from "react";
import TextInput from "../components/inputs/textInput";
import PrimaryButton from "../components/buttons/primaryButton";
import {TopReview} from "../components/login/topReview";
import {IconGoogle} from "../components/icons/iconGoogle";
import {IconShowHidePassword} from "../components/icons/iconShowHidePassword";
import * as yup from 'yup';
import {useFormik} from 'formik';
import Header from "../components/navigation/header";
import {useMutation, useQuery} from "react-query";
import Link from "next/link";
import {registerUser} from "../API/user.api";
import {TokenContext} from "../contexts/tokenContext";
import {TokenContextType} from "../@types/token";
import Router from "next/router";


export default function Register() {

    const [showpass, setShowPass] = useState(false)
    const {token, saveToken} = useContext(TokenContext) as TokenContextType;

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .required('First name is required'),
        last_name: yup
            .string()
            .required('Last name is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateRegistration()
        },
    })

    const {isLoading: isRegisteringUser, mutate: initiateRegistration} = useMutation<any, Error>(
        async () => {
            return await registerUser(formik.values).then(response => {
                if (response.status == 201) {
                    saveToken({access: response.data.access_token, refresh: null})
                    Router.replace('/')
                } else if (response.status == 400) {
                    formik.setErrors(response.data)
                }
            })
        }
    );

    return (
        <>
            <div>
                <div
                    className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                    <div className=" md:hidden sm:mb-8 mb-6">
                        <div className="w-full">
                            <p className="text-3xl font-bold leading-none text-gray-600">JOB PORTAL</p>
                        </div>
                    </div>

                    <div
                        className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
                        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Create a new account
                        </p>

                        {/*<button aria-label="Continue with google" role="button"*/}
                        {/*        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100">*/}


                        {/*    <IconGoogle/>*/}
                        {/*    <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>*/}
                        {/*</button>*/}

                        {/*<div className="w-full flex items-center justify-between py-5">*/}
                        {/*    <hr className="w-full bg-gray-400"/>*/}
                        {/*    <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>*/}
                        {/*    <hr className="w-full bg-gray-400"/>*/}
                        {/*</div>*/}
                        <div className="flex items-center justify-between gap-x-4">
                            <div className="mt-6">
                                <TextInput type={'text'}
                                           name={'first_name'}
                                           label={'first name'}
                                           value={formik.values.first_name}
                                           onChange={formik.handleChange}
                                           error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                           errorMsg={formik.touched.first_name && formik.errors.first_name}
                                />
                            </div>

                            <div className={"mt-6"}>
                                <TextInput type={'text'}
                                           name={'last_name'}
                                           label={'last name'}
                                           value={formik.values.last_name}
                                           onChange={formik.handleChange}
                                           error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                           errorMsg={formik.touched.last_name && formik.errors.last_name}
                                />
                            </div>

                        </div>
                        <div className={"mt-6"}>
                            <TextInput type={'email'}
                                       name={'email'}
                                       label={'email'}
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       errorMsg={formik.touched.email && formik.errors.email}
                            />

                        </div>


                        <div className="mt-6 w-full">

                            <TextInput type={showpass ? 'text' : 'password'}
                                       name={'password'}
                                       label={'password'}
                                       cClass="relative flex items-center justify-center"
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       error={formik.touched.password && Boolean(formik.errors.password)}
                                       errorMsg={formik.touched.password && formik.errors.password}
                            >
                                <div onClick={() => setShowPass(!showpass)}
                                     className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                    <IconShowHidePassword show={showpass}/>
                                </div>
                            </TextInput>

                        </div>
                        <div className="mt-6">
                            <PrimaryButton
                                disabled={isRegisteringUser || Object.keys(formik.errors).length !== 0}
                                onClick={formik.submitForm}
                                name={"SIGN UP"} cClass="w-full"
                                class={"w-full h-full mx-0  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 disabled:bg-gray-500 text-sm font-semibold leading-none text-white focus:outline-none py-4"}/>
                        </div>

                        <p
                            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                            Already have account?
                            <Link href="login">
                                <a
                                    className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                                    {" "}
                                    Login here
                                </a>
                            </Link>

                        </p>
                    </div>

                    <TopReview/>
                </div>
            </div>
        </>
    );
}
