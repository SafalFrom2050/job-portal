import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation} from "react-query";
import {updateUser} from "../../API/user.api";
import Router from "next/router";
import SuccessModal from "../modals/successModal";
import {FormErrorMessage} from "../common/formErrorMessage";
import Heading from "../common/heading";
import TextInput from "../inputs/textInput";
import PrimaryButton from "../buttons/primaryButton";
import TextArea from "../inputs/TextArea";

function ManageOrganizationInfo() {
    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const validationSchema = yup.object({
        org_title: yup
            .string()
            .required(),
        org_description: yup
            .string(),
        org_number_of_employees: yup
            .number(),
        org_average_salary: yup
            .number(),
    });


    const formik = useFormik({
        initialValues: {
            org_title: user.org_title || '',
            org_description: user.org_description || '',
            org_number_of_employees: user.org_number_of_employees || 0,
            org_average_salary: user.org_average_salary || 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateUpdateAccount()
        },
    })

    useEffect(() => {
        console.log(user)
        formik.setFieldValue("org_title", user.org_title || "")
        formik.setFieldValue("org_description", user.org_description || "")
        formik.setFieldValue("org_number_of_employees", user.org_number_of_employees || 0)
        formik.setFieldValue("org_average_salary", user.org_average_salary || 0)

        setFormDisabled(false)

    }, [user]);


    const {isLoading: isUpdatingAccount, mutate: initiateUpdateAccount} = useMutation<any, Error>(
        async () => {
            if (axiosInstance == null) return false

            const userRequest: User = {...formik.values, id: user.id}

            const result = await updateUser(axiosInstance, userRequest).then(response => {

                if (response.status == 200) {
                    // Success
                    setShowSuccessModal(true)
                } else if (response.status == 400) {
                    formik.setErrors(response.data)
                } else if (response.status == 401) {
                    if (response.data.detail != null) {
                        setErrorMsg(response.data.detail)
                    }
                }
            })

            if (syncUser) {
                syncUser()
            }

            return result
        }
    );

    function showProfilePage() {
        Router.push('/profile/me')
    }

    return (
        <>
            <SuccessModal show={showSuccessModal}
                          setShow={setShowSuccessModal}
                          buttonLeftText={"Return To Job List"}
                          buttonRightText={"View Profile"}
                          buttonRightOnClick={showProfilePage}
                // buttonLeftOnClick={returnToJobList}
                          title={"Your account has been updated"}/>

            {errorMsg &&
                <FormErrorMessage errorMsg={errorMsg}/>
            }

            <div className="max-w-[800px] mx-auto bg-white rounded py-8 px-10 mt-3 shadow">
                <Heading heading={"School Information"} cClass={"pt-0 pb-6 px-0"} hClass={"text-xl"}/>

                <form method={"POST"} onSubmit={(e) => {
                    e.preventDefault();
                    formik.submitForm()
                }}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">

                        <TextInput name="org_title"
                                   placeholder="John"
                                   type="text"

                                   value={formik.values.org_title}
                                   onChange={formik.handleChange}
                                   error={formik.touched.org_title && Boolean(formik.errors.org_title)}
                                   errorMsg={formik.touched.org_title && formik.errors.org_title}

                                   label={"School Name"}
                                   required={true}
                        />

                        <div className={"col-span-2"}>
                            <TextArea name={"org_description"}
                                      label={"School Description"}
                                      value={formik.values.org_description}

                                      onChange={(e) => {
                                          formik.setFieldValue("org_description", e.target.value)
                                      }}
                                      error={formik.touched.org_title && Boolean(formik.errors.org_title)}
                                      errorMsg={formik.touched.org_title && formik.errors.org_title}

                                      iClass={"px-2"}/>
                        </div>

                        <div className={'col-span-2 md:col-span-1'}>
                            <TextInput name="org_number_of_employees"
                                       type="number"

                                       value={String(formik.values.org_number_of_employees)}
                                       onChange={formik.handleChange}
                                       error={formik.touched.org_number_of_employees && Boolean(formik.errors.org_number_of_employees)}
                                       errorMsg={formik.touched.org_number_of_employees && formik.errors.org_number_of_employees}

                                       label={"Number of Staff"}
                            />
                        </div>

                        <div className={'col-span-2 md:col-span-1'}>
                            <TextInput name="org_average_salary"
                                       type="number"

                                       value={String(formik.values.org_average_salary)}
                                       onChange={formik.handleChange}
                                       error={formik.touched.org_average_salary && Boolean(formik.errors.org_average_salary)}
                                       errorMsg={formik.touched.org_average_salary && formik.errors.org_average_salary}

                                       label={"Average Salary"}
                            />
                        </div>

                    </div>


                    <div
                        className="flex flex-col-reverse items-center justify-end w-full mt-6 gap-4 md:flex-row">
                        <PrimaryButton name={"Update"} isSubmitType={true}
                                       disabled={formDisabled || isUpdatingAccount}
                                       class="font-medium text-base"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ManageOrganizationInfo;