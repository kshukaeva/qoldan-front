import axios from "axios";

export const getCategories = async () => {
    try {
        let params = {}

        const headers = {}

        const response = await axios.get(
            "http://localhost:8100/api/category",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}