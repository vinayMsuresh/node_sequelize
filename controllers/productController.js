const model = require('../models');

const Product = model.products;
const Review = model.reviews;

const addProduct = async (req, res) => {
    const info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false, 
    };

    const product = await Product.create(info);
    res.status(200).json(product);
};

const getAllProducts = async ( req, res ) => {
    const products = await Product.findAll({});
    res.status(200).send(products);
} 

const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id: id}});
    res.status(200).send(product);
}

const updateProductById = async (req, res) => {
    const id = req.params.id;
    const product = await Product.update(req.body, { where: { id: id }});
    res.status(200).send(product);
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.destroy({ where: { id: id }});
    res.status(200).send('Product deleted successfully');
}

const publishedProducts = async (req, res) => {
    const product = await Product.findAll({ where: { published: true}});
    res.status(200).send(product);
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProduct,
    publishedProducts
}