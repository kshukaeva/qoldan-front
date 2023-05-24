import axios from "axios";

// GET requests
export const getImage = async (imageId) => {
    try {
        const params = {}
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            responseType: 'arraybuffer'
        }

        const response = await axios.get(
            "http://localhost:8100/api/image/" + imageId,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// POST requests
export const postImage = async (image) => {
    try {
        const data = new FormData();
        data.append('name', 'image');
        data.append('file_attachment', image);

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data;'
        };
        const response = await axios.post(
            "http://localhost:8100/api/image",
            data,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}