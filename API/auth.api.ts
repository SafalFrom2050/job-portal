import axios, {AxiosError, AxiosInstance} from "axios";
import {Response} from "./http-common";


export async function getCurrentUser(axiosInstance: AxiosInstance | null) {

    if (axiosInstance == null) return {data: [], status: null} as Response

    try {
        const response = await axiosInstance.get(
            `user/auth/get_profile/`
        );

        const {data, status} = response

        return {data, status} as Response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const e = error as AxiosError
            return {data:e.response?.data, status: e.response?.status};
        } else {
            return {data: [], status: null} as Response;
        }
    }
}