
import api from './axiosConfig.js';

async function removeProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}

export default removeProduct;
