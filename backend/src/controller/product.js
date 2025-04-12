
import ProductService from '../service/product.js';

const getProducts = async (request, response) => {
    try {
        const products = await ProductService.getAll();

        response.status(200).json(products || []);
    }
    catch(error) {
        console.error(error);
        response.status(500).send('It wasn\'t possible to get all products.');
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
        response.status(500).send('It wasn\'t possible to get product.');
    }
};

const createProduct = async (request, response) => {
    try {
        const data = request.body;
        const isAlreadyCreated = await ProductService.getByName(data.name);

        if(isAlreadyCreated.length !== 0) {
            return response.status(400).send('Product already exists.');
        }

        await ProductService.create(data);

        response.status(201).send('Product was created successfully.');
    }
    catch(error) {
        console.error(error);
        response.status(500).send('It wasn\'t possible to create product.');
    }
};

const editProduct = async (request, response) => {
    try {
        const data = request.body;
        const id = request.params;

        await ProductService.edit(id, data);

        response.status(200).send('Product was edited successfully.');
    }
    catch(error) {
        console.error(error);
        response.status(500).send('It wasn\'t possible to edit product.');
    }
};

const removeProduct = async (request, response) => {
    try {
        const id = request.params;

        await ProductService.remove(id);

        response.status(200).send('Product was removed successfully.');
    }
    catch(error) {
        console.error(error);
        response.status(500).send('It wasn\'t possible to remove product.');
    }
};

export default {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    removeProduct
};
