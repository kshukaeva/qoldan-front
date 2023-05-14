import axios from 'axios'

export const getProducts = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8100/api/product"
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const postProduct = async (product) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.post(
            "http://localhost:8100/api/product",
            product,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}