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
import Dropdown from "../common/dropdown/dropdown";
import {overrideTailwindClasses} from "tailwind-override";
import WhiteButton from "../buttons/whiteButton";
import PrimaryButton from "../buttons/primaryButton";

function ManageBasicInfo() {

    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType

    const genderTypes = [
        {
            key: "MALE", value: "Male",
        },
        {
            key: "FEMALE", value: "Female"
        },
        {
            key: "OTHER", value: "Other"
        },
        {
            key: "UNKNOWN", value: "Unknown"
        }
    ]

    function getGenderValue(key: String): string {
        const genderType = genderTypes.find((type) => type.key == key)
        return genderType?.value || "Select"
    }

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .required(),
        last_name: yup
            .string()
            .required(),
        gender: yup
            .string()
            .required(),
        birth_date: yup
            .date(),
        phone: yup
            .string()
            .required(),
        expected_salary_low: yup
            .string(),
        expected_salary_high: yup
            .string(),
        experience: yup
            .number()
    });


    const formik = useFormik({
        initialValues: {
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            gender: user.gender || '',
            birth_date: user.birth_date || '',
            phone: user.phone || '',
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
        formik.setFieldValue("first_name", user.first_name || "")
        formik.setFieldValue("last_name", user.last_name || "")
        formik.setFieldValue("gender", user.gender || "")
        formik.setFieldValue("birth_date", user.birth_date || "")
        formik.setFieldValue("phone", user.phone || "")
        formik.setFieldValue("can_shift_location", user.can_shift_location || false)
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
                <Heading heading={"Basic Information"} cClass={"pt-0 pb-6 px-0"} hClass={"text-xl"} />

                <form method={"POST"} onSubmit={(e) => {
                    e.preventDefault();
                    formik.submitForm()
                }}>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-4">

                        <TextInput name="first_name"
                                   placeholder="John"
                                   type="text"

                                   value={formik.values.first_name}
                                   onChange={formik.handleChange}
                                   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                   errorMsg={formik.touched.first_name && formik.errors.first_name}

                                   label={"First Name"}
                                   required={true}
                        />
                        <TextInput name="last_name"
                                   placeholder={"Doe"}
                                   type="text"

                                   value={formik.values.last_name}
                                   onChange={formik.handleChange}
                                   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                   errorMsg={formik.touched.last_name && formik.errors.last_name}

                                   label={"Last Name"}
                                   required={true}/>

                        <TextInput name="phone"
                                   placeholder={"98XXXXXXXX"}
                                   type="text"

                                   value={formik.values.phone}
                                   onChange={formik.handleChange}
                                   error={formik.touched.phone && Boolean(formik.errors.phone)}
                                   errorMsg={formik.touched.phone && formik.errors.phone}

                                   label={"Phone"}
                                   required={true}/>

                        <Dropdown name={"gender"}
                                  options={genderTypes}
                                  selected={getGenderValue(formik.values.gender)}

                                  onSelect={(v) => !formik.setFieldValue("gender", v, true)}
                                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                                  errorMsg={formik.touched.gender && formik.errors.gender}

                                  label="Gender"
                                  separateLabel={true}
                                  required={true}
                        />

                        <TextInput name="birth_date"
                                   type="date"

                                   value={formik.values.birth_date}
                                   onChange={formik.handleChange}
                                   error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                                   errorMsg={formik.touched.birth_date && formik.errors.birth_date}

                                   label={"Birth Date"}
                                   iClass={"px-2"}
                        />

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

export default ManageBasicInfo;