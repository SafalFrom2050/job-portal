import React, {useContext} from 'react';
import PrimaryButton from "../../components/buttons/primaryButton";
import TextInput from "../../components/inputs/textInput";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";
import {useMutation} from "react-query";
import * as yup from "yup";
import {useFormik} from "formik";
import {sendEmailForPasswordReset} from "../../API/user.api";
import {AlertContext} from "../../contexts/alertContext";
import {AlertContextType} from "../../@types/alert";
import {ALERT_TYPE_SUCCESS} from "../../constants";

function ForgotPassword() {

    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;
    const {setAlert} = useContext(AlertContext) as AlertContextType;

    const validationSchema = yup.object({
        email: yup
            .string()
            .required(),
    });


    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            initiateSendEmailForPasswordReset()
        },
    })

    const {isLoading: isSendingEmail, mutate: initiateSendEmailForPasswordReset} = useMutation<any, Error>(
        async () => {
            if (axiosInstance == null) return false

            const result = await sendEmailForPasswordReset(formik.values.email).then((response) => {
                if (response.status == 200) {
                    console.log("success")
                    setAlert({
                        title: 'Sent',
                        message: 'Password reset link sent to ' + formik.values.email,
                        type: ALERT_TYPE_SUCCESS,
                        duration: 30000
                    })
                    formik.resetForm()
                } else if (response.status == 404) {
                    formik.setFieldError('email', response.data.message)
                }
            })
            return result
        }
    );

    return (
        <div className="mt-20 flex flex-col">


            <div className="rounded bg-white py-6 px-8 mx-auto">
                <div className={"max-w-[18rem] mx-auto"}>
                    <p className="text-2xl text-gray-800 font-semibold text-center">
                        Forgot your password?
                    </p>
                    <p className="text-center text-gray-600 pb-4 pt-2">
                        A link will be sent to your email address with instructions to recover your account.
                    </p>
                </div>
                <form className={"flex flex-col gap-2"}
                      method={"POST"}
                      onSubmit={(e) => {
                          e.preventDefault();
                          formik.submitForm()
                      }}>

                    <TextInput type={'text'}
                               name={'email'}
                               placeholder={'Email'}

                               value={formik.values.email}
                               onChange={formik.handleChange}
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               errorMsg={formik.touched.email && formik.errors.email}

                    />
                    <PrimaryButton name={"Proceed"}
                                   class={"text-sm"}
                                   cClass={"mx-auto"}
                                   isSubmitType={true}
                                   onClick={formik.submitForm}
                                   disabled={!formik.isValid || isSendingEmail}/>
                </form>
            </div>

        </div>
    );
}

export default ForgotPassword;