import axios, {AxiosError, AxiosInstance} from "axios";

export type Post = {
    id?: number;
    title?: string;
    post?: string;
    location?: string;
    time_low?: number;
    time_high?: number;
    salary_low?: string;
    salary_high?: string;
    description?: string;
    lodging?: boolean;
    created_date?: string;
    published_date?: string;
    author?: number;
}

export type PostListResponse = {
    posts: Post[]
}



export const getPosts = async (http: AxiosInstance) => {

    try {
        const {data, status} = await http.get<PostListResponse>(
            'post/'
        );

        console.log(JSON.stringify(data));

        return {data, status} as unknown as Response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const e = error as AxiosError
            return {data:e.response?.data, status: e.response?.status};
        } else {
            return {data: 'An unexpected error occurred', status: null} as unknown as Response;
        }
    }
}