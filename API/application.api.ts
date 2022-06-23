import axios, {AxiosError, AxiosInstance} from "axios";
import {Response} from "./http-common";
import {Application, ApplicationListResponse} from "../@types/application";

export const createApplication = async (http: AxiosInstance, application: Application) => {

    console.log(application)

    try {
        const {data, status} = await http.post(
            'application/submit/',
            application,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log(JSON.stringify(data));

        return {data, status} as Response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const e = error as AxiosError
            return {data:e.response?.data, status: e.response?.status};
        } else {
            return {data: 'An unexpected error occurred', status: null} as Response;
        }
    }
}


export const getAllApplications = async (http: AxiosInstance | null) => {

    if (http == null) return {data: [], status: null};

    try {
        const {data, status} = await http.get<ApplicationListResponse>(
            'application/'
        );
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