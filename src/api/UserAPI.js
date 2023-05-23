import axios from "axios";

export const getProfile = async () => {
    try {
        let params = {}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            "http://localhost:8100/api/my-profile",
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const putUpdateProfile = async (userData) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.post(
            "http://localhost:8100/api/my-profile",
            userData,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}