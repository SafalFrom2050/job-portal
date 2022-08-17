import React, {useContext, useState} from "react";
import TextInput from "../components/inputs/textInput";
import PrimaryButton from "../components/buttons/primaryButton";
import {TopReview} from "../components/login/topReview";
import {IconShowHidePassword} from "../components/icons/iconShowHidePassword";
import * as yup from 'yup';
import {useFormik} from 'formik';
import Link from "next/link";
import {useMutation} from "react-query";
import {loginUser} from "../API/user.api";
import {TokenContext} from "../contexts/tokenContext";
import {TokenContextType} from "../@types/token";
import Router from "next/router";
import {AlertContext} from "../contexts/alertContext";
import {AlertContextType} from "../@types/alert";
import {FormErrorMessage} from "../components/common/formErrorMessage";


export default function Login() {

    const {token, saveToken} = useContext(TokenContext) as TokenContextType;
    const {setAlert} = useContext(AlertContext) as AlertContextType;
    const [showpass, setShowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false);

    const validationSchema = yup.object({
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
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateLogin()
        },
    })

    const { isLoading: isLoggingIn, mutate: initiateLogin } = useMutation<any, Error>(
        async () => {
            return await loginUser(formik.values).then(response => {
                if (response.status == 200){
                    saveToken(response.data)
                    Router.replace('/')
                    setAlert({type: 0, title: "You are logged in", duration: 3000})
                }else if (response.status == 400) {
                    formik.setErrors(response.data)
                }else if (response.status == 401) {
                    if (response.data.detail != null) {
                        setErrorMsg(response.data.detail)
                    }
                }
            })
        }
    );

    return (
        <>

            <form method={"POST"} onSubmit={(e) => { e.preventDefault(); formik.submitForm()}}>
                <div
                    className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
                    <div className=" md:hidden sm:mb-8 mb-6">
                        <div className="w-full">
                            <p className="text-3xl font-bold leading-none text-gray-600">JOB PORTAL</p>
                        </div>
                    </div>
                    <div
                        className="bg-white shadow rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full px-10 py-10">
                        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                            Login to your account
                        </p>

                        {/*<button aria-label="Continue with google" role="button"*/}
                        {/*        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100">*/}


                        {/*    <IconGoogle/>*/}
                        {/*    <p className="text-base font-medium ml-4 text-gray-700">Login with Google</p>*/}
                        {/*</button>*/}

                        {/*<div className="w-full flex items-center justify-between py-5">*/}
                        {/*    <hr className="w-full bg-gray-400"/>*/}
                        {/*    <p className="text-base font-medium leading-4 px-2.5 text-gray-500">OR</p>*/}
                        {/*    <hr className="w-full bg-gray-400"/>*/}
                        {/*</div>*/}

                        <div className="mt-8">
                            {errorMsg &&
                                <FormErrorMessage errorMsg={errorMsg}/>
                            }
                            <TextInput type={'email'}
                                       name={'email'}
                                       label={'email'}
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       errorMsg={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className="mt-4 w-full">

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

                            <div className={'text-right'}>
                                <Link href="/auth/forgotPassword">
                                    <a
                                        className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                                        {" "}
                                        Forgot password?
                                    </a>
                                </Link>

                            </div>

                        </div>
                        <div className="mt-2">
                            <PrimaryButton
                                disabled={(isLoggingIn)}
                                onClick={formik.submitForm}
                                isSubmitType={true}
                                name={"LOGIN"} cClass="w-full"
                                           class={"w-full h-full mx-0 disabled:bg-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none py-4"}/>
                        </div>

                        <p
                            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
                            Don&apos;t have account?{" "}
                            <Link href="/register">
                                <a
                                    className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
                                    {" "}
                                    Create account here
                                </a>
                            </Link>

                        </p>
                    </div>

                    <TopReview/>
                </div>
            </form>
        </>
    );
}
