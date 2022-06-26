import React, {useContext} from 'react';
import PrimaryButton from "../../components/buttons/primaryButton";
import {useMutation} from "react-query";
import {AxiosContext} from "../../contexts/axiosContext";
import {AxiosContextType} from "../../@types/axiosContextType";

function VerifyEmail() {


    const {axiosInstance} = useContext(AxiosContext) as AxiosContextType;

    const {isLoading: isSendingEmail, mutate: initiateSendVerificationEmail} = useMutation<any, Error>(
        async () => {
            if (axiosInstance == null) return false
            // TODO: Implementation
        }
    );


    return (
        <div className="mt-20 flex flex-col">


            <div className="rounded bg-white  py-6 px-8 mx-auto">
                <div className={"max-w-[18rem] mx-auto"}>
                    <p className="text-2xl text-gray-800 font-semibold text-center">
                        Verify your email
                    </p>
                    <p className="text-center text-gray-600 pb-4 pt-2">
                        A link has been sent to your email address with instructions to complete your account setup.
                    </p>
                </div>
                <form className={"flex flex-col gap-2"}>
                    <PrimaryButton name={"Resend"} class={"text-sm"} cClass={"mx-auto"} />
                </form>
            </div>

        </div>
    );
}

export default VerifyEmail;