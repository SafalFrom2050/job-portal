import axios, {AxiosError} from 'axios'
import {BASE_URL} from "./config";

export type User = {
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

export type Response = {
    data: any,
    status: number | null
}

export const registerUser = async (user: User) => {

    try {
        const {data, status} = await axios.post<RegisterUserResponse>(
            BASE_URL + 'user/auth/register/',
            user,
            {
                headers: {
                    Accept: 'application/json',
                }
            },
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
        const {data, status} = await axios.post<RegisterUserResponse>(
            BASE_URL + 'user/auth/login/',
            credentials,
            {
                headers: {
                    Accept: 'application/json',
                }
            },
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