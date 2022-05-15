import axios, {AxiosError, AxiosInstance} from "axios";
import {Response} from "./http-common";
export type Post = {
    id?: number;
    title?: string;
    field?: PostField;
    position?: string;
    location?: string;
    time_low?: number;
    time_high?: number;
    salary_low?: string;
    salary_high?: string;
    description?: string;
    lodging?: boolean;
    created_date?: string;
    published_date?: string;
    author?: {
        first_name?: string,
        last_name?: string,
        id?: string,
        avatar?: string
    };
}

export type PostRequest = Post & {
    field?: string,
    author?: string
}

export type PostField = {
    id?: string,
    name?: string,
    description?: string
}

export type PostListResponse = {
    posts: Post[]
}

export type PostFieldListResponse = {
    postFields: PostField[]
}



export const getPosts = async (http: AxiosInstance | null) => {

    if (http == null) return {data: [], status: null};

    try {
        const {data, status} = await http.get<PostListResponse>(
            'post/'
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

export const getPostFields = async (http: AxiosInstance | null) => {

    if (http == null) return {data: [], status: null};

    try {
        const {data, status} = await http.get<PostFieldListResponse>(
            'post/field/'
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

export const createPost = async (http: AxiosInstance, post: PostRequest) => {

    console.log(post)
    try {
        const {data, status} = await http.post<PostListResponse>(
            'post/',
            post
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