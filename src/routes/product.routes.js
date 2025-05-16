import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();
const controller = new ProductController();

router
    .post('/', controller.createProduct)
    .get('/', controller.getAllProducts)
    .patch('/:id', controller.updateProductById)
    .delete('/:id', controller.deleteProductById)

export default router;