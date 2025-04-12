
import api from './axiosConfig.js';

async function getProducts() {
    const response = await api.get('/products');
    return response.data;
}

export default getProducts;
