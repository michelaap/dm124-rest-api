const { validationResult } = require('express-validator');

const Product = require('../models/Product');

module.exports = {
  async createProduct(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const { name, description, price } = request.body;
      const product = await Product.create({
        name,
        description,
        price
      });
      await product.save();
      return response.json({ message: 'Product created!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  },
  async getProduct(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const productId = request.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return response.json(204).end();
      }

      return response.json(product);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  },
  async getProducts(request, response) {
    try {
      const products = await Product.find().sort('-createdAt');

      if (!products) {
        return response.status(204).end();
      }

      return response.json(products);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  },
  async updateProduct(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const productId = request.params.id;
      const { price } = request.body;
      const product = await Product.findById(productId);

      if (!product) {
        return response.status(204).end();
      }

      product.price = price;
      await product.save();
      return response
        .json({ message: 'Product updated!', product });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  },
  async deleteProduct(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const productId = request.params.id;
      const product = await Product.findByIdAndRemove(productId);

      if (!product) {
        return response.json(204).end();
      }

      return response.json({ message: 'Product deleted!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  }
}
