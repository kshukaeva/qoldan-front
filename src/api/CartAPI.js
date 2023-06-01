import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

export const postAddToCart = async (productId) => {
    try {
        const params = {
            productId: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            apiBaseUrl + "/my-cart",
            { }, { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteFromCart = async (productId) => {
    try {
        const params = {
            productId: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.delete(
             apiBaseUrl + "/my-cart",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMyCart = async (limit, offset) => {
    try {
        let params = {}
        if (limit != null)
            params = {...params, limit: limit}
        if (offset != null)
            params = {...params, offset: offset}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            apiBaseUrl + "/my-cart",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const postBookCart = async () => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            apiBaseUrl + "/my-cart/book",
            { }, { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const postUnbookCart = async () => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            apiBaseUrl + "/my-cart/unbook",
            { }, { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}