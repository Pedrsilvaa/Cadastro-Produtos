
import api from './axiosConfig.js';

async function editProduct(id, data) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
}

export default editProduct;
