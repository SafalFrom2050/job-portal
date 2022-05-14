import React, {useContext, useEffect, useState} from 'react';
import TextInput from "../../components/inputs/textInput";
import ToggleCheckbox from "../../components/inputs/toggleCheckbox";
import WhiteButton from "../../components/buttons/whiteButton";
import PrimaryButton from "../../components/buttons/primaryButton";
import * as yup from "yup";
import {useFormik} from "formik";
import Dropdown from "../../components/common/dropdown/dropdown";
import {overrideTailwindClasses} from "tailwind-override";
import {upperFirst} from "lodash";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";
import Heading from "../../components/common/heading";

function Index(props: {}) {

    const {user} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);

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

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .required(),
        last_name: yup
            .string()
            .required(),
        avatar: yup
            .object(),
        gender: yup
            .string()
            .required(),
        birth_date: yup
            .date()
            .required(),
        phone: yup
            .string()
            .required(),
        email: yup
            .string()
            .required(),
        is_organization: yup
            .boolean(),
        can_shift_location: yup
            .boolean(),
        expected_salary_low: yup
            .string(),
        expected_salary_high: yup
            .string(),
        experience: yup
            .number(),
        isAvailable: yup
            .boolean()
    });


    const formik = useFormik({
        initialValues: {
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            avatar: '',         // TODO: Profile image upload
            gender: '',
            birth_date: '',
            phone: '',
            email: '',             // TODO: Not in the request
            is_organization: false,
            can_shift_location: true,
            expected_salary_low: '',
            expected_salary_high: '',
            experience: 0,
            is_available: false
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            alert(values.toJSON())
            // initiateCreatePost()
        },
    })

    useEffect(() => {
        formik.setFieldValue("first_name", user.first_name || "")
        formik.setFieldValue("last_name", user.last_name || "")
        formik.setFieldValue("avatar", user.avatar || "")
        formik.setFieldValue("gender", user.gender || "")
        formik.setFieldValue("birth_date", user.birth_date || "")
        formik.setFieldValue("phone", user.phone || "")
        formik.setFieldValue("email", user.email || "")
        formik.setFieldValue("is_organization", user.is_organization || "")
        formik.setFieldValue("can_shift_location", user.can_shift_location || "")
        formik.setFieldValue("expected_salary_low", user.expected_salary_low || "")
        formik.setFieldValue("expected_salary_high", user.expected_salary_high || "")
        formik.setFieldValue("experience", user.experience || "")
        formik.setFieldValue("is_available", user.is_available || "")

        console.log(user)

    }, [user]);


    return (
        <div>
            <Heading heading={"Manage Account"}/>
            <div className="max-w-[700px] mx-auto bg-white rounded p-6 mt-3">
                <form method={"POST"} onSubmit={(e) => {
                    e.preventDefault();
                    formik.submitForm()
                }}>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-4">
                        <input name={"author"} hidden aria-hidden/>

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

                        <TextInput name="email"
                                   placeholder={"john@email.com"}
                                   type="text"

                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   error={formik.touched.email && Boolean(formik.errors.email)}
                                   errorMsg={formik.touched.email && formik.errors.email}

                                   label={"Email"}
                                   required={true}/>

                        <Dropdown name={"gender"}
                                  options={genderTypes}

                                  onSelect={(v) => !formik.setFieldValue("gender", v, true)}
                                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                                  errorMsg={formik.touched.gender && formik.errors.gender}

                                  label="Gender"
                                  separateLabel={true}
                                  required={true}
                        />

                        <div>
                            <label htmlFor={"expected_salary_low"}
                                   className={overrideTailwindClasses(`text-sm font-medium leading-none text-gray-800 ${formik.touched.expected_salary_low && Boolean(formik.errors.expected_salary_low) ? "text-red-600" : ""}`)}>
                                {"Expected Salary Range"}

                            </label>
                            <div className={"flex items-end gap-3"}>

                                <TextInput name="expected_salary_low"
                                           type="number"
                                           leftLabel={"Rs."}

                                           value={formik.values.expected_salary_low}
                                           onChange={formik.handleChange}
                                           error={formik.touched.expected_salary_low && Boolean(formik.errors.expected_salary_low)}
                                           errorMsg={formik.touched.expected_salary_low && formik.errors.expected_salary_low}/>

                                <span className={"font-medium text-gray-600 my-2"}>To</span>

                                <TextInput name="expected_salary_high"
                                           type="number"

                                           value={formik.values.expected_salary_high}
                                           onChange={formik.handleChange}
                                           error={formik.touched.expected_salary_high && Boolean(formik.errors.expected_salary_high)}
                                           errorMsg={formik.touched.expected_salary_high && formik.errors.expected_salary_high}
                                />
                            </div>
                        </div>

                        <TextInput name="birth_date"
                                   type="date"

                                   value={formik.values.birth_date}
                                   onChange={formik.handleChange}
                                   error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                                   errorMsg={formik.touched.birth_date && formik.errors.birth_date}

                                   label={"Birth Date"}
                                   iClass={"px-2"}
                        />

                        <TextInput name="experience"
                                   type="number"
                                   rightLabel={" years"}

                                   value={formik.values.experience.toString()}
                                   onChange={formik.handleChange}
                                   error={formik.touched.experience && Boolean(formik.errors.experience)}
                                   errorMsg={formik.touched.experience && formik.errors.experience}

                                   label={"Experience"}/>

                        <ToggleCheckbox name={"is_organization"}

                                        defaultChecked={formik.values.is_organization}
                                        onChange={formik.handleChange}
                                        error={formik.touched.is_organization && Boolean(formik.errors.is_organization)}
                                        errorMsg={formik.touched.is_organization && formik.errors.is_organization}

                                        label={"Is Organization"}/>

                        <ToggleCheckbox name={"can_shift_location"}

                                        defaultChecked={formik.values.can_shift_location}
                                        onChange={formik.handleChange}
                                        error={formik.touched.can_shift_location && Boolean(formik.errors.can_shift_location)}
                                        errorMsg={formik.touched.can_shift_location && formik.errors.can_shift_location}

                                        label={"Can Shift Location"}/>

                        <ToggleCheckbox name={"is_available"}

                                        defaultChecked={formik.values.is_available}
                                        onChange={formik.handleChange}
                                        error={formik.touched.is_available && Boolean(formik.errors.is_available)}
                                        errorMsg={formik.touched.is_available && formik.errors.is_available}

                                        label={"Is Available To Work"}/>
                    </div>
                    <div
                        className="flex flex-col-reverse items-center justify-end w-full mt-6 gap-4 md:flex-row">
                        <WhiteButton name={"Go Back"} class="font-medium text-base"/>
                        <PrimaryButton name={"Save"}
                            // disabled={isCreatingPost}
                            // onClick={formik.submitForm}
                                       class="font-medium text-base"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Index;