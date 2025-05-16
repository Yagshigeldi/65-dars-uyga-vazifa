import db from "../models/index.js";

export class ProductController {
    async createProduct(req, res) {
        try {
            const product = await db.Product.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async getAllProducts(_, res) {
            try {
                const products = await db.Product.findAll({
                    include: { all: true },
                    attributes: [
                        'id',
                        'name',
                        'price'
                    ]
                });
                return res.status(200).json({
                    statusCode: 200,
                    message: 'success',
                    data: products
                });
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
    }

    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await db.Product.findByPk(id, { include: { all: true } });
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async updateProductById(req, res) {
        try {
            const id = req.params.id;
            const updated = await db.Product.update(req.body, { where: { id } });
            const updatedProduct = await db.Product.findByPk(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedProduct
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteProductById(req, res) {
        try {
            const id = req.params.id;
            await db.Product.destroy({ where: { id } });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}