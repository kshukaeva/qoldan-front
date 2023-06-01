import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

const apiUrl = apiBaseUrl + "/donations";

// GET Requests
export const getDonationsToOrganization = async () => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiUrl + "/to-organization",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// POST Requests
export const postDonation = async (data) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.post(
            apiUrl,
            data,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// PUT Requests
export const putDonationStatus = async (id, status) => {
    try {
        const params = { status }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiUrl + "/to-organization/" + id,
            {},
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}