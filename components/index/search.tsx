import {useContext, useEffect, useState} from "react";
import {SearchIcon} from "@heroicons/react/solid";
import {ArrowDown} from "heroicons-react";
import PrimaryButton from "../buttons/primaryButton";
import TextButton from "../buttons/textButton";
import Dropdown from "../common/dropdown/dropdown";
import TextInput from "../inputs/textInput";
import WhiteButton from "../buttons/whiteButton";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useMutation, useQuery} from "react-query";
import {getPostFields, Post, PostField, SearchPostRequest, searchPosts} from "../../API/post.api";
import * as yup from "yup";
import {useFormik} from "formik";
import Router, {useRouter} from "next/router";
import {positionTypes} from "../../others/config";

export const searchStates = {
    notSearching: 0,
    searching: 1,
    end: 2
}

function Search(props: { onSearchStateChange: (state: number) => void, onSearchError: (error: string) => void, onSearchResults: (posts: Post[]) => void }) {

    const {query} = useRouter()

    const [showFilters, setShowFilters] = useState(false);

    const {axiosInstanceGuest} = useContext(AxiosContext) as AxiosContextType

    const {data, isLoading} = useQuery("postFields", fetchPostFields, {
        enabled: axiosInstanceGuest != null,
        retryOnMount: true
    })

    const postFields = data?.data as PostField[]

    function fetchPostFields() {
        // return null
        return getPostFields(axiosInstanceGuest)
    }

    const getFieldTypes = () => {
        if (!postFields || !Array.isArray(postFields)) return []
        return postFields.map((field) => ({key: field.id || "", value: field.name || ""}))
    }

    const fieldTypes = getFieldTypes()


    function toggleAdvanceOptions() {
        setShowFilters((v) => !v)
    }

    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const validationSchema = yup.object({
        title: yup
            .string(),
        field: yup
            .string(),
        position: yup
            .string(),
        location: yup
            .string()
    });


    const formik = useFormik({
        initialValues: {
            title: '',
            field: '',
            position: '',
            location: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateSearchQuery()
        },
    })


    const {isLoading: isSearching, mutate: initiateSearchQuery} = useMutation<any, Error>(
        async () => {
            if (axiosInstanceGuest == null) return false

            const searchPostRequest: SearchPostRequest = {...formik.values, ...query}
            props.onSearchStateChange(searchStates.searching)

            return await searchPosts(axiosInstanceGuest, searchPostRequest).then(response => {

                if (response.status == 200) {
                    // Success
                    props.onSearchResults(response.data.results)
                } else if (response.status == 400) {
                    formik.setErrors(response.data)
                } else if (response.status == 401) {
                    if (response.data.detail != null) {
                        setErrorMsg(response.data.detail)
                    }
                }

                props.onSearchStateChange(searchStates.end)

            })
        }
    );

    useEffect(() => {

        if (Object.keys(query).length === 0) {
            props.onSearchStateChange(searchStates.notSearching)
            props.onSearchResults([])
            formik.resetForm()
            return
        }

        initiateSearchQuery()

        if (query.location != "" || query.field != "" || query.position != "") {
            setShowFilters(true)
        }

        async function setValues() {
            await formik.setFieldValue("title", query.title)
            await formik.setFieldValue("location", query.location)
            await formik.setFieldValue("field", query.field)
            await formik.setFieldValue("position", query.position)
        }

        setValues()

    }, [query]);


    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (formik.isValid) {
                    Router.push({pathname: "/", query: formik.values},
                        undefined, {shallow: true}
                    )
                }
            }}>

                <div className="relative">
                    <div className="py-4">
                        <div className={`mt-7 pt-0  rounded-[4px]  bg-white max-w-[400px] w-full mx-auto ${showFilters && 'shadow-2xl'}`}>
                            <div className={`py-6 mt-12 transition-all`} id="interaction">
                                <div className={'px-8'}>
                                    <div className=" flex flex-col w-full gap-y-2">
                                        <div className="relative w-full">
                                            <input name={"title"}
                                                   id={"title"}
                                                   autoComplete={"search-jobs"}

                                                   autoFocus={true}
                                                   onChange={formik.handleChange}
                                                   value={formik.values.title}

                                                   placeholder="Search Job"
                                                   className="p-4 py-2 outline-none md:focus pr-10  bg-gray-50 border rounded border-gray-100 text-slate-600 w-full leading-4"
                                            />

                                            <SearchIcon
                                                className="w-6 h-6 absolute pointer-events-none top-2 right-5 text-gray-600"/>

                                        </div>
                                        <div className="flex justify-between w-full h-10 mt-3 gap-x-2 flex-wrap">

                                            <TextButton
                                                name={"Filters"}
                                                onClick={toggleAdvanceOptions}
                                                class={"text-sm"}
                                                cClass={"h-full flex items-center"}
                                                iconRight={<ArrowDown
                                                    className={`w-4 h-4 transform duration-150 ${showFilters ? "rotate-180" : ""}`}/>}
                                            />

                                            <PrimaryButton
                                                autoFocus={false}
                                                isSubmitType={true}
                                                name={'Search'}
                                                cClass="h-full flex items-center"
                                                class={`${showFilters ? "hidden" : ""} font-medium text-base mx-0`}/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={` bg-white absolute z-50 px-8 max-w-[400px] w-full rounded-[4px] mt-4 transition-all duration-150 ${showFilters ? "h-auto min-h-0 max-h-screen shadow-2xl" : "max-h-0 overflow-hidden"} `}>
                                    <hr className="bg-[#F1F5F9] mb-6"/>

                                    <div className={"flex flex-col gap-3"}>
                                        {/* Interaction */}

                                        <Dropdown name={"position"} options={positionTypes}

                                                  selected={formik.values.position}
                                                  onSelect={(v) => !formik.setFieldValue("position", v, true)}

                                                  label="Level" cClass={"bg-white border border-gray-200"}/>

                                        <Dropdown name={"field"} options={fieldTypes}

                                                  selected={(postFields && formik.values.field) ? postFields.find((field) => field.id == formik.values.field)?.name : 'Subject'}
                                                  onSelect={(v) => !formik.setFieldValue("field", v, true)}

                                                  label="Subject" cClass={"bg-white border border-gray-200"}/>

                                        <TextInput name="location" placeholder="Location" type="text"
                                                   autocomplete={"home city"}
                                                   onChange={formik.handleChange} value={formik.values.location}
                                                   iClass="bg-white mt-0 text-sm px-5 font-medium text-gray-600 placeholder-gray-400"/>

                                    </div>
                                    <div
                                        className="flex flex-col items-center justify-end w-full gap-4 my-4 lg:flex-row">
                                        {/*<WhiteButton name={"Advanced"} class="font-medium text-sm"/>*/}
                                        <PrimaryButton autoFocus={false} disabled={isSearching || !formik.isValid}
                                                       isSubmitType={true}
                                                       name={"Search"}
                                                       class="font-medium text-base mx-0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Search;
