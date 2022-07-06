import axios, {AxiosError, AxiosInstance} from "axios";
import {Response} from "./http-common";
import {POST_LIST_LIMIT_PER_PAGE} from "../constants";
import {BASE_URL} from "../others/config";
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

export type SearchPostRequest = Post & {
    field?: string,
    author?: string
}

export type PostField = {
    id?: string,
    name?: string,
    description?: string
}

export type PostListResponse = {
    count?: number,
    next?: string,
    previous?: string,
    results?: Post[]
}

export type PostFieldListResponse = {
    postFields: PostField[]
}

export type PostRequestOptions = Post & {
    limit?: number,
    offset?: string,
    url?: string
}


export const getPosts = async (http: AxiosInstance | null, options?: PostRequestOptions) => {

    if (http == null) return {data: [], status: null};

    try {
        let url = 'post/'
        if(options && options.url !== undefined && options.url) {
            url = options.url.replace(BASE_URL, '')
            options.url = undefined
        }

        const {data, status} = await http.get<PostListResponse>(
            url,
            {params: {limit: POST_LIST_LIMIT_PER_PAGE, ...options}}
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

export const getPostById = async (http: AxiosInstance | null, id?: string) => {

    if (http == null || !id) return {data: [], status: null};

    try {
        const {data, status} = await http.get<PostListResponse>(
            `post/${id}/`
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

export const searchPosts = async (http: AxiosInstance | null, searchPostRequest: SearchPostRequest) => {

    if (http == null) return {data: [], status: null};

    try {
        const {data, status} = await http.get<PostListResponse>(
            'post/', {params: searchPostRequest}
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