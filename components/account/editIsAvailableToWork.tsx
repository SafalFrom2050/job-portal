import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation} from "react-query";
import {updateUser} from "../../API/user.api";
import ToggleWithDetails from "../inputs/toggleWithDetails";

function EditIsAvailableToWork() {

    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType


    const validationSchema = yup.object({
        is_available: yup
            .boolean()
            .required(),
    });


    const formik = useFormik({
        initialValues: {
            is_available: user.is_available,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateUpdateAccount()
        },
    })

    useEffect(() => {
        formik.setFieldValue("is_available", user.is_available || false)
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
        <ToggleWithDetails name={"is_available"}

                           defaultChecked={formik.values.is_available}
                           onChange={(e) => {
                               formik.handleChange(e)
                               formik.submitForm()
                           }}
                           error={formik.touched.is_available && Boolean(formik.errors.is_available)}
                           errorMsg={formik.touched.is_available && formik.errors.is_available}

                           disabled={isUpdatingAccount}
                           loading={isUpdatingAccount}

                           title={"Looking For a New Job?"}
                           description={"Enable this option which lets companies to find you."}/>
    );
}

export default EditIsAvailableToWork;