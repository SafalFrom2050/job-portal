import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";

import TextInput from "../../components/inputs/textInput";
import Dropdown from "../../components/common/dropdown/dropdown";
import ToggleCheckbox from "../../components/inputs/toggleCheckbox";
import WhiteButton from "../../components/buttons/whiteButton";
import PrimaryButton from "../../components/buttons/primaryButton";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation, useQuery} from "react-query";
import {loginUser} from "../../API/user.api";
import {createPost, getPostFields, Post, PostField, PostRequest} from "../../API/post.api";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {now} from "lodash";
import moment from "moment";
import SuccessModal from "../../components/modals/successModal";
import Router from "next/router";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType} from "../../@types/user";

function Create(props: {}) {

    const [errorMsg, setErrorMsg] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType
    const {user} = useContext(AuthContext) as AuthContextType;

    const {data} = useQuery("postFields", fetchPostFields, {
        enabled: axiosInstance != null,
        retryOnMount: true
    })

    const postFields = data?.data as PostField[]


    function fetchPostFields() {
        return getPostFields(axiosInstance)
    }

    const getFieldTypes = () => {
        if (!postFields) return []
        return postFields.map((field) => ({key: field.id || "", value: field.name || ""}))
    }

    const fieldTypes = getFieldTypes()

    const positionTypes = [
        {key: "Teacher", value: "Teacher"},
        {key: "Driver", value: "Driver"},
        {key: "Developer", value: "Developer"},
        {key: "Backend", value: "Backend"}
    ]

    const validationSchema = yup.object({
        title: yup
            .string()
            .required('Job Title is required'),
        field: yup
            .string()
            .required('Field is required'),
        position: yup
            .string()
            .required('Position is required'),
        location: yup
            .string()
            .required('Location is required'),
        description: yup
            .string()
            .min(8, 'Description should be of minimum 8 characters length')
            .required('Description is required'),
        time_low: yup
            .string(),
        time_high: yup
            .string(),
        salary_low: yup
            .string(),
        salary_high: yup
            .string(),
        lodging: yup
            .boolean()
    });


    const formik = useFormik({
        initialValues: {
            title:'',
            field: '',
            position: '',
            location: '',
            time_low: '',
            time_high: '',
            salary_low: '20000',
            salary_high: '100000',
            description: '',
            lodging: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log("submitting...")
            initiateCreatePost()
        },
    })
    const { isLoading: isCreatingPost, mutate: initiateCreatePost } = useMutation<any, Error>(
        async () => {
            console.log("axiosInstance: ")
            console.log(axiosInstance)
            if (axiosInstance == null) return false

            const post: PostRequest = {...formik.values ,time_high: 1, time_low: 2}

            return await createPost(axiosInstance, post).then(response => {

                if (response.status == 200){
                    // Success
                    setShowSuccessModal(true)
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

    useEffect(() => {
        return () => {
            console.log(formik.errors)
        };
    }, [formik.errors]);



    function newForm() {
        formik.resetForm()
        setShowSuccessModal(false)
    }

    function returnToJobList() {
        Router.push("/")
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
            </Head>

            <SuccessModal show={showSuccessModal}
                          setShow={setShowSuccessModal}
                          buttonLeftText={"Return To Job List"}
                          buttonRightText={"Add New Job"}
                          buttonRightOnClick={newForm}
                          buttonLeftOnClick={returnToJobList}
                          title={"Job Post Created Successfully"}
            description={"Thank you for using our platform."}/>

            <main>
                <h2 className="max-w-[800px] mx-auto px-4 font-medium text-xl mt-6 text-gray-700">Hire Staff</h2>

                <div className="max-w-[700px] mx-auto bg-white rounded p-6 mt-3">
                    <form method={"POST"} onSubmit={(e) => { e.preventDefault(); formik.submitForm()}}>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-4">
                            <input name={"author"} value={`${user.first_name} ${user.last_name}`}  hidden aria-hidden/>
                            <div className={"col-span-2"}>
                                <TextInput name="title"
                                           placeholder="We are looking for..."
                                           type="text"

                                           value={formik.values.title}
                                           onChange={formik.handleChange}
                                           error={formik.touched.title && Boolean(formik.errors.title)}
                                           errorMsg={formik.touched.title && formik.errors.title}

                                           label={"Job Title"}
                                           required={true}
                                />
                            </div>
                            <Dropdown name={"field"}
                                      options={fieldTypes}

                                      onSelect={(v)=> !formik.setFieldValue("field", v, true)}
                                      error={formik.touched.field && Boolean(formik.errors.field)}
                                      errorMsg={formik.touched.field && formik.errors.field}

                                      label="Field"
                                      separateLabel={true}
                                      required={true}/>

                            <Dropdown name={"position"}
                                      options={positionTypes}


                                      onSelect={(v)=> !formik.setFieldValue("position", v, true)}
                                      error={formik.touched.position && Boolean(formik.errors.position)}
                                      errorMsg={formik.touched.position && formik.errors.position}

                                      label="Position"
                                      separateLabel={true}
                                      required={true}/>

                            <TextInput name="location"
                                       placeholder="Kathmandu"
                                       type="text"

                                       value={formik.values.location}
                                       onChange={formik.handleChange}
                                       error={formik.touched.location && Boolean(formik.errors.location)}
                                       errorMsg={formik.touched.location && formik.errors.location}

                                       label={"Location"}
                                       required={true}
                            />
                            <TextInput name="description"
                                       placeholder={"We are looking for..."}
                                       type="text"

                                       value={formik.values.description}
                                       onChange={formik.handleChange}
                                       error={formik.touched.description && Boolean(formik.errors.description)}
                                       errorMsg={formik.touched.description && formik.errors.description}

                                       label={"Description"}
                                       required={true}/>

                            <div className={"flex items-end gap-3"}>

                                <TextInput name="salary_low"
                                           type="number"
                                           leftLabel={"Rs."}

                                           value={formik.values.salary_low}
                                           onChange={formik.handleChange}
                                           error={formik.touched.salary_low && Boolean(formik.errors.salary_low)}
                                           errorMsg={formik.touched.salary_low && formik.errors.salary_low}

                                           label={"Salary Range"}/>

                                <span className={"font-medium text-gray-600 my-2"}>To</span>

                                <TextInput name="salary_high"
                                           type="number"

                                           value={formik.values.salary_high}
                                           onChange={formik.handleChange}
                                           error={formik.touched.salary_high && Boolean(formik.errors.salary_high)}
                                           errorMsg={formik.touched.salary_high && formik.errors.salary_high}
                                />
                            </div>

                            <div className={"flex items-end gap-3"}>
                                <TextInput name="time_low"
                                           type="time"

                                           // value={formik.values.time_low}
                                           onChange={formik.handleChange}
                                           error={formik.touched.time_low && Boolean(formik.errors.time_low)}
                                           errorMsg={formik.touched.time_low && formik.errors.time_low}

                                           label={"Time Range"}
                                           iClass={"px-2"}
                                />
                                <span className={"font-medium text-gray-600 my-2"}>To</span>
                                <TextInput name="time_high"
                                           type="time"

                                           // value={formik.values.time_high}
                                           onChange={formik.handleChange}
                                           error={formik.touched.time_high && Boolean(formik.errors.time_high)}
                                           errorMsg={formik.touched.time_high && formik.errors.time_high}

                                           iClass={"px-2"}
                                />
                            </div>


                            <ToggleCheckbox name={"lodging"} defaultChecked={true} label={"Lodging"} />
                        </div>
                        <div
                            className="flex flex-col-reverse items-center justify-end w-full mt-6 gap-4 md:flex-row">
                            <WhiteButton name={"Cancel"} class="font-medium text-base" />
                            <PrimaryButton name={"Add Post"}
                                           disabled={isCreatingPost}
                                           onClick={formik.submitForm}
                                           class="font-medium text-base"/>
                        </div>
                    </form>
                </div>
            </main>

        </div>
    );
}

export default Create;