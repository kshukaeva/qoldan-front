import axios from "axios";

// GET requests
export const getSellOrders = async (sellConfirmed = null) => {
    try {
        let params = {}
        if (sellConfirmed) {
            params = {
                sellConfirmed: sellConfirmed
            }
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.get(
            "http://localhost:8100/api/my-orders/sells",
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
            "http://localhost:8100/api/my-orders",
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
        const params = {
            id: productId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            "http://localhost:8100/api/my-orders",
            {},
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}