import axios from "axios";
import {BASE_URL} from "../others/config";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    }
});

export type Response = {
    data: any,
    status: number | null
}