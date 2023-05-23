import axios from "axios";

export const postAddToCart = async (productId) => {
    try {
        const params = {
            productId: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            "http://localhost:8100/api/my-cart",
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
            "http://localhost:8100/api/my-cart",
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
            "http://localhost:8100/api/my-cart",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const postBookCart = async (productId) => {
    try {
        const params = {}
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        const response = await axios.post(
            "http://localhost:8100/api/my-cart/book",
            { }, { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}