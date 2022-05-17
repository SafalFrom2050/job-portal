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

function EditCanShiftLocation() {

    const {user, syncUser} = useContext(AuthContext) as AuthContextType;
    const [errorMsg, setErrorMsg] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType


    const validationSchema = yup.object({
        can_shift_location: yup
            .boolean()
            .required(),
    });


    const formik = useFormik({
        initialValues: {
            can_shift_location: user.can_shift_location,
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateUpdateAccount()
        },
    })

    useEffect(() => {
        formik.setFieldValue("can_shift_location", user.can_shift_location || false)
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
        <ToggleWithDetails name={"can_shift_location"}

                           defaultChecked={formik.values.can_shift_location}
                           onChange={(e) => {
                               formik.handleChange(e)
                               formik.submitForm()
                           }}
                           error={formik.touched.can_shift_location && Boolean(formik.errors.can_shift_location)}
                           errorMsg={formik.touched.can_shift_location && formik.errors.can_shift_location}

                           disabled={isUpdatingAccount}
                           loading={isUpdatingAccount}

                           title={"Will You Shift Location?"}
                           description={"Are you ready to live in another location if the job requires it?"}/>
    );
}

export default EditCanShiftLocation;