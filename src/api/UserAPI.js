import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

export const getProfile = async () => {
    try {
        let params = {}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            apiBaseUrl + "/my-profile",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUserType = async () => {
    try {
        let params = {}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            apiBaseUrl + "/my-profile/type",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const putUpdateProfile = async (userData) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiBaseUrl + "/my-profile",
            userData,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}