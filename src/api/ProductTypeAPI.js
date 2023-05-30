import axios from "axios";

export const getProductTypes = async () => {
    try {
        let params = {}

        const headers = {}

        const response = await axios.get(
            "http://localhost:8100/api/product-type",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}