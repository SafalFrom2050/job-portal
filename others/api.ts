import axios from 'axios'
import {BASE_URL} from "./config";

export type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export type RegisterUserResponse = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export const registerUser = async (user: User) => {

    try {
        const {data, status} = await axios.post<RegisterUserResponse>(
            BASE_URL + '/user/auth/register/',
            user,
            {
                headers: {
                    Accept: 'application/json',
                }
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}