import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

export const getMyOrganization = async () => {
    try {
        let params = {}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        let id = localStorage.getItem('organizationId');

        const response = await axios.get(
            apiBaseUrl + "/organization/" + id,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const putUpdateOrganization = async (data) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiBaseUrl + "/organization/" + data.id,
            data,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}