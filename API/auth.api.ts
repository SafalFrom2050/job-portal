import {AxiosInstance} from "axios";


export function getCurrentUser(axiosInstance: AxiosInstance) {
    return axiosInstance?.get('user/auth/get_profile/');
}