import {AxiosInstance} from "axios";

export interface AxiosContextType {
    axiosInstance: AxiosInstance | null,
    axiosInstanceGuest: AxiosInstance | null,
}