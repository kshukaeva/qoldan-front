import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

const apiUrl = apiBaseUrl + "/donation-announcements";

// GET requests
export const getAnnouncements = async (status, organizationName) => {
    try {
        let params = { status, organizationName }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiUrl,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMyAnnouncements = async (status) => {
    try {
        let params = { status }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiUrl + "/my",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAnnouncementWithId = async (id) => {
    try {
        let params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiUrl + "/" + id,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// POST requests
export const postAnnouncement = async (data) => {
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

// PUT requests
export const putUpdateAnnouncement = async (data) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiUrl + "/" + data.id,
            data,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}