
import ProductModel from '../model/product.js';

const getAll = async () => await ProductModel.find({});

const getById = async (id) => await ProductModel.findById(id);

const getByName = async (name) => await ProductModel.find({ name });

const create = async (data) => await ProductModel.create(data);

const update = async (id, data) => await ProductModel.findByIdAndUpdate(id, data, { new: true });

const remove = async (id) => await ProductModel.findByIdAndDelete(id);

export default {
    getAll,
    getById,
    getByName,
    create,
    update,
    remove
};
