
import api from './axiosConfig.js';

async function getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export default getProductById;
