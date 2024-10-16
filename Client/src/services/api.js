import axios from "axios";
import { constant } from "constant";

// Function to get authorization headers
const getAuthHeaders = () => ({
    headers: {
        Authorization: localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
});

export const postApi = async (path, data, login) => {
    try {
        const result = await axios.post(`${constant.baseUrl}${path}`, data, getAuthHeaders());

        // Save the token and user data if present
        if (result.data?.token) {
            if (login) {
                localStorage.setItem('token', result.data.token);
            } else {
                sessionStorage.setItem('token', result.data.token);
            }
            localStorage.setItem('user', JSON.stringify(result.data.user));
        }

        return result;
    } catch (e) {
        console.error(e.response ? e.response.data : e.message); // Log the error response
        return e.response ? e.response.data : e; // Return a structured error response
    }
};

export const putApi = async (path, data) => {
    try {
        const result = await axios.put(`${constant.baseUrl}${path}`, data, getAuthHeaders());
        return result;
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
        return e.response ? e.response.data : e;
    }
};

export const deleteApi = async (path, id) => {
    try {
        const result = await axios.delete(`${constant.baseUrl}${path}${id}`, getAuthHeaders());
        
        // Save the token if present
        if (result.data?.token) {
            localStorage.setItem('token', result.data.token);
        }
        return result;
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
        return e.response ? e.response.data : e;
    }
};

export const deleteManyApi = async (path, data) => {
    try {
        const result = await axios.post(`${constant.baseUrl}${path}`, data, getAuthHeaders());

        // Save the token if present
        if (result.data?.token) {
            localStorage.setItem('token', result.data.token);
        }
        return result;
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
        return e.response ? e.response.data : e;
    }
};

export const getApi = async (path, id) => {
    try {
        const url = `${constant.baseUrl}${path}${id ? id : ''}`;
        const result = await axios.get(url, getAuthHeaders());
        return result;
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
        return e.response ? e.response.data : e;
    }
};
