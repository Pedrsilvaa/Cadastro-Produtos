
import ProductService from '../service/product.js';

const getProducts = async (request, response) => {
    try {
        const products = await ProductService.getAll();
        response.status(200).json(products || []);
    }
    catch(error) {
        console.error(error);
        response.status(500).json({ message: 'it wasn\'t possible to get all products' });
    }
};

const getProductById = async (request, response) => {
    try {
        const id = request.params;
        const product = await ProductService.getById(id);
        response.status(200).json(product || []);
    }
    catch(error) {
        console.error(error);
        response.status(500).json({ message: 'it wasn\'t possible to get product' });
    }
};

const createProduct = async (request, response) => {
    try {
        const data = request.body;
        const isAlreadyCreated = await ProductService.getByName(data.name);
        if(isAlreadyCreated.length !== 0) return response.status(400).json({ message: 'product already exists' });
        await ProductService.create(data);
        response.status(201).json({ message: 'product was created successfully' });
    }
    catch(error) {
        console.error(error);
        response.status(500).json({ message: 'it wasn\'t possible to create product' });
    }
};

const updateProduct = async (request, response) => {
    try {
        const data = request.body;
        const id = request.params;
        await ProductService.update(id, data);
        response.status(204).json({ message: 'product was updated successfully' });
    }
    catch(error) {
        console.error(error);
        response.status(500).json({ message: 'it wasn\'t possible to update product' });
    }
};

const removeProduct = async (request, response) => {
    try {
        const id = request.params;
        await ProductService.remove(id);
        response.status(204).json({ message: 'product was removed successfully' });
    }
    catch(error) {
        console.error(error);
        response.status(500).json({ message: 'it wasn\'t possible to remove product' });
    }
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    removeProduct
};
