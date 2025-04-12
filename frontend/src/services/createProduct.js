
import api from './axiosConfig.js';

async function createProduct(data) {
    const response = await api.post('/products', data);
    return response.data;
}

export default createProduct;
