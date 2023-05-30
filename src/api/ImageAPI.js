import axios from "axios";
import {noImageUrl} from "../helper/ImageHelper";

// GET requests
export const getImage = async (imageId) => {
    try {
        const params = {}
        const headers = {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            "Content-Type": "application/json, charset=UTF-8",
            "responseType": 'bytearray'
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

export const getImageUrl = (imageId) => {
    if (imageId) {
        return `http://localhost:8100/api/image/${imageId}`;
    } else {
        return noImageUrl;
    }
}

// POST requests
export const postImage = async (image) => {
    try {
        const data = new FormData();
        data.append('image', image);

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
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