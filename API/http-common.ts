import axios from "axios";
import {BASE_URL} from "../others/config";
import {Post} from "./post.api";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    }
});

export type Response = {
    data: any | Post[],
    status: number | null
}