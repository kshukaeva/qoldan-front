import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

const apiUrl = apiBaseUrl + "/category";

export const getCategories = async () => {
    try {
        let params = {};
        const headers = {};

        const response = await axios.get(
            apiUrl,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const postCategory = async (title) => {
    try {
        const data = { title };
        const params = {};
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

export const putCategory = async (data) => {
    try {
        const params = {};
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

export const deleteCategory = async (id) => {
    try {
        const params = {};
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.delete(
            apiUrl + "/" + id,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}