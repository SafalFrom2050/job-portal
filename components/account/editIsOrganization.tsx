import React, {useContext, useEffect, useState} from 'react';
import ToggleWithDetails from "../inputs/toggleWithDetails";
import {AuthContext} from "../../contexts/authContext";
import {AuthContextType, User} from "../../@types/user";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import * as yup from "yup";
import {useFormik} from "formik";
import {useMutation} from "react-query";
import {updateUser} from "../../API/user.api";

function EditIsOrganization() {

    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType


    const validationSchema = yup.object({
        is_organization: yup
            .boolean()
            .required(),
    });


    const formik = useFormik({
        initialValues: {
            is_organization: user.is_organization,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateUpdateAccount()
        },
    })

    useEffect(() => {
        formik.setFieldValue("is_organization", user.is_organization || false)
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
        <ToggleWithDetails name={"is_organization"}

                           defaultChecked={formik.values.is_organization}
                           onChange={(e) => {
                               formik.handleChange(e)
                               formik.submitForm()
                           }}
                           error={formik.touched.is_organization && Boolean(formik.errors.is_organization)}
                           errorMsg={formik.touched.is_organization && formik.errors.is_organization}

                           disabled={isUpdatingAccount}
                           loading={isUpdatingAccount}

                           title={"Are You a Job Provider?"}
                           description={"Organization account has access to additional features for hiring top talents."}/>
    );
}

export default EditIsOrganization;