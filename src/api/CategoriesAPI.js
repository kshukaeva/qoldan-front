import axios from 'axios'

export const getCategories = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8100/api/category"
        )
        return response;
    } catch (error) {
        throw error;
    }
}

