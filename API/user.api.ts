import axios, {AxiosError} from 'axios'

import http, {Response} from "./http-common";

export type RegistrationCredential = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}


export type LoginCredential = {
    email: string,
    password: string
}

export type RegisterUserResponse = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export const registerUser = async (credential: RegistrationCredential) => {

    try {
        const {data, status} = await http.post<RegisterUserResponse>(
            'user/auth/register/',
            credential
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

export const loginUser = async (credentials: LoginCredential) => {

    try {
        const {data, status} = await http.post<RegisterUserResponse>(
            'user/auth/login/',
            credentials
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