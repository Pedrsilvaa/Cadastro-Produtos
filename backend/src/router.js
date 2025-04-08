
import { Router } from 'express';
import ProductController from './controller/product.js';

const routes = Router();

routes.get('/products', ProductController.getProducts);

routes.get('/products/:_id', ProductController.getProductById);

routes.post('/products', ProductController.createProduct);

routes.put('/products/:_id', ProductController.updateProduct);

routes.delete('/products/:_id', ProductController.removeProduct);

export { routes };
