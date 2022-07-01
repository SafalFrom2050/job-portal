import axios, {AxiosError, AxiosInstance} from 'axios'

import http, {Response} from "./http-common";
import {User} from "../@types/user";

export type RegistrationCredential = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_organization?: boolean
}


export type LoginCredential = {
    email: string,
    password: string
}

export type RegisterUserRequest = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_organization?: boolean
}

export type UpdateUserProfilePictureRequest = {
    id?: number
    avatar?: File | string
}

export const registerUser = async (credential: RegistrationCredential) => {

    console.log(credential)
    try {
        const {data, status} = await http.post<RegisterUserRequest>(
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
        const {data, status} = await http.post<RegisterUserRequest>(
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

// TODO: Implementation
export const sendVerificationEmail = async () => {

    try {
        const {data, status} = await http.post<RegisterUserRequest>(
            'user/auth/login/'
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

export const sendEmailForPasswordReset = async (email: String) => {

    try {
        const {data, status} = await http.post<RegisterUserRequest>(
            'user/auth/reset_password/',
            {email: email}
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

export const updateUser = async (axiosInstance: AxiosInstance, user: User | UpdateUserProfilePictureRequest) => {

    try {
        const response = await axiosInstance.patch(
            `user/${user.id}/`,
            user,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log(user)
        const {data, status} = response

        return {data, status} as Response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const e = error as AxiosError
            return {data:e.response?.data, status: e.response?.status};
        } else {
            console.log(error)
            return {data: 'An unexpected error occurred', status: null} as Response;
        }
    }
}


export const getUserById = async (axiosInstance: AxiosInstance | null, id: string) => {

    if (axiosInstance == null) return {data: [], status: null} as Response

    try {
        const response = await axiosInstance.get(
            `user/${id}/`
        );

        console.log(response)
        const {data, status} = response

        console.log(JSON.stringify(data));

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

export const getUsers = async (axiosInstance: AxiosInstance | null) => {

    if (axiosInstance == null) return {data: [], status: null} as Response

    try {
        const response = await axiosInstance.get(
            `user/`
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