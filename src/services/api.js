import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const fetchProducts = () => {
    return axios.get(`${API_BASE_URL}/products`);
};

export const fetchProductDetails = (id) => {
    return axios.get(`${API_BASE_URL}/products/${id}`);
};
