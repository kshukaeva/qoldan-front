import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

export const postAddToWishlist = async (productId) => {
    try {
        const params = {
            productId: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            apiBaseUrl + "/my-wishlist",
            { }, { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteFromWishlist = async (productId) => {
    try {
        const params = {
            productId: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.delete(
            apiBaseUrl + "/my-wishlist",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMyWishlist = async (limit, offset) => {
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
            apiBaseUrl + "/my-wishlist",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}