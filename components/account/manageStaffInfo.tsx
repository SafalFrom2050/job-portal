import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation} from "react-query";
import {updateUser} from "../../API/user.api";
import SuccessModal from "../modals/successModal";
import {FormErrorMessage} from "../common/formErrorMessage";
import Heading from "../common/heading";
import TextInput from "../inputs/textInput";
import {overrideTailwindClasses} from "tailwind-override";
import PrimaryButton from "../buttons/primaryButton";
import WhiteButton from "../buttons/whiteButton";
import ModalPortfolioFiles from "./modalPortfolioFiles";

export default function ManageStaffInfo() {
    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);

    const [showPortfolioUploadModal, setShowPortfolioUploadModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const validationSchema = yup.object({
        expected_salary_low: yup
            .string(),
        expected_salary_high: yup
            .string(),
        experience: yup
            .number()
    });


    const formik = useFormik({
        initialValues: {
            expected_salary_low: user.expected_salary_low || '',
            expected_salary_high: user.expected_salary_high || '',
            experience: user.experience || 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateUpdateAccount()
        },
    })

    useEffect(() => {

        formik.setFieldValue("expected_salary_low", user.expected_salary_low || 50000)
        formik.setFieldValue("expected_salary_high", user.expected_salary_high || 200000)
        formik.setFieldValue("experience", user.experience || 0)

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
    return (
        <>
            <ModalPortfolioFiles setShow={setShowPortfolioUploadModal} show={showPortfolioUploadModal}/>


            <SuccessModal show={showSuccessModal}
                          setShow={setShowSuccessModal}
                          buttonLeftText={"Return To Job List"}
                          buttonRightText={"View Profile"}
                // buttonRightOnClick={newForm}
                // buttonLeftOnClick={returnToJobList}
                          title={"Your account has been updated"}/>

            {errorMsg &&
                <FormErrorMessage errorMsg={errorMsg} />
            }

            <div className="max-w-[800px] mx-auto bg-white rounded py-8 px-10 mt-3 shadow">
                <Heading heading={"Other Information"} cClass={"pt-0 pb-6 px-0"} hClass={"text-xl"} />

                <form method={"POST"} onSubmit={(e) => {
                    e.preventDefault();
                    formik.submitForm()
                }}>
                    <div className="grid sm:grid-cols-1 gap-x-8 gap-y-8">

                        <div className={"flex items-center gap-x-3"}>
                            <label htmlFor={"expected_salary_low"}
                                   className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${formik.touched.expected_salary_low && Boolean(formik.errors.expected_salary_low) ? "text-red-600" : ""}`)}>
                                {"Expected Salary Range (Rs.)"}

                            </label>
                            <div className={"flex items-end gap-3"}>

                                <TextInput name="expected_salary_low"
                                           type="number"
                                           iClass={"max-w-[6rem]"}

                                           value={formik.values.expected_salary_low}
                                           onChange={formik.handleChange}
                                           error={formik.touched.expected_salary_low && Boolean(formik.errors.expected_salary_low)}
                                           errorMsg={formik.touched.expected_salary_low && formik.errors.expected_salary_low}/>

                                <span className={"font-medium text-sm text-gray-600 my-2"}>To</span>

                                <TextInput name="expected_salary_high"
                                           type="number"
                                           iClass={"max-w-[6rem]"}

                                           value={formik.values.expected_salary_high}
                                           onChange={formik.handleChange}
                                           error={formik.touched.expected_salary_high && Boolean(formik.errors.expected_salary_high)}
                                           errorMsg={formik.touched.expected_salary_high && formik.errors.expected_salary_high}
                                />
                            </div>
                        </div>

                        <div className={"flex items-center gap-x-3"}>
                            <label htmlFor={"expected_salary_low"}
                                   className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${formik.touched.expected_salary_low && Boolean(formik.errors.expected_salary_low) ? "text-red-600" : ""}`)}>
                                {"Experience"}

                            </label>

                            <TextInput name="experience"
                                       type="number"
                                       rightLabel={" years"}
                                       iClass={"max-w-[4rem]"}

                                       value={formik.values.experience.toString()}
                                       onChange={formik.handleChange}
                                       error={formik.touched.experience && Boolean(formik.errors.experience)}
                                       errorMsg={formik.touched.experience && formik.errors.experience}/>
                        </div>

                        <div className={"flex flex-col-reverse items-center justify-center w-full md:flex-row"}>
                            <WhiteButton name={"Upload Portfolio/CV"} class={"font-medium"} onClick={()=>setShowPortfolioUploadModal(true)} />
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