import axios from 'axios'

// GET requests
export const getProducts = async (limit = null, offset = null) => {
    try {
        let params = {}
        if (limit != null)
            params = {...params, limit: limit}
        if (offset != null)
            params = {...params, offset: offset}
        let headers = {}
        if (localStorage.getItem("token")) {
            headers = {
                ...headers,
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const response = await axios.get(
            "http://localhost:8100/api/product",
            { params, headers },
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getProductPages = async (perPage) => {
    try {
        let params = {
            perPage: perPage
        }
        let headers = {}
        if (localStorage.getItem("token")) {
            headers = {
                ...headers,
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        const response = await axios.get(
            "http://localhost:8100/api/product/pages",
            { params, headers },
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getProduct = async (id) => {
    try {
        let params = {}

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            "http://localhost:8100/api/product/" + id,
            { params, headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getMyProducts = async (limit = null, offset = null) => {
    try {
        let params = {}
        if (limit != null)
            params = {...params, limit: limit}
        if (offset != null)
            params = {...params, offset: offset}
        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(
            "http://localhost:8100/api/product/my",
            { params, headers },
        )
        return response;
    } catch (error) {
        throw error;
    }
}

// POST requests
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

// PUT requests
export const putProduct = async (product) => {
    try {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
        const response = await axios.put(
            "http://localhost:8100/api/product/" + product.id,
            product,
            { headers }
        )
        return response;
    } catch (error) {
        throw error;
    }
}