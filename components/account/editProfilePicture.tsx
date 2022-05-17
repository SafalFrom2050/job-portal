import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation} from "react-query";
import {updateUser, UpdateUserProfilePictureRequest} from "../../API/user.api";
import SuccessModal from "../modals/successModal";
import {FormErrorMessage} from "../common/formErrorMessage";
import Heading from "../common/heading";
import ImageInput from "../inputs/ImageInput";

function EditProfilePicture() {

    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType


    const validationSchema = yup.object({
        avatar: yup
            .mixed()
    });


    const formik = useFormik({
        initialValues: {
            avatar: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log(values)
            initiateUpdateAccount()
        },
    })

    useEffect(() => {
        formik.setFieldValue("avatar", user.avatar || "")

        setFormDisabled(false)

    }, [user]);

    useEffect(() => {
        console.log(formik.values)
        console.log(formik.errors)

    }, [formik.errors, formik.values]);


    const {isLoading: isUpdatingAccount, mutate: initiateUpdateAccount} = useMutation<any, Error>(
        async () => {
            if (axiosInstance == null) return false

            const userRequest: UpdateUserProfilePictureRequest = {...formik.values, id: user.id}

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
        <div>
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

            <div className="max-w-[800px] mx-auto py-4 px-10 mt-3">
                <form method={"POST"}  encType="multipart/form-data" onSubmit={(e) => {
                    e.preventDefault();
                    formik.submitForm()
                }}>

                    <ImageInput
                        value={user.avatar}
                        name={"avatar"}
                        handleChange={(target) => {
                            if (target.files){
                                formik.setFieldValue("avatar", target.files[0]);
                                formik.submitForm()
                            }
                        }}
                    />
                </form>

                <Heading heading={"Profile Picture"} cClass={"pt-0 pb-6 px-0"} hClass={"text-xl mx-auto"} />
            </div>
        </div>
    );
}

export default EditProfilePicture;