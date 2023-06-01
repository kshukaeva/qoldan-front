import axios from "axios";
import {apiBaseUrl} from "./useApiCall";

// GET requests
export const getSellOrders = async (sellConfirmed = null) => {
    try {
        let params = {}
        if (sellConfirmed !== null) {
            params = {
                sellConfirmed: sellConfirmed
            }
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiBaseUrl + "/my-orders/sells",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getPurchaseOrders = async (status = null) => {
    try {
        let params = {}
        if (status !== null) {
            params = { status: status.toUpperCase() };
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            apiBaseUrl + "/my-orders/purchases",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// POST requests
export const postOrder = async (address, paymentId) => {
    try {
        const params = {
            paymentId: paymentId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.post(
            apiBaseUrl + "/my-orders",
            address,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// PUT requests
export const putSellConfirm = async (productId) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiBaseUrl + "/my-orders/confirm/sell-product/" + productId,
            {},
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const putPurchaseProductConfirm = async (productId) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiBaseUrl + "/my-orders/confirm/product/" + productId,
            {},
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const putPurchaseOrderConfirm = async (orderId) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            apiBaseUrl + "/my-orders/confirm/" + orderId,
            {},
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}