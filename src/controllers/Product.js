const Product = require('../models/Product');

module.exports = {
  async createProduct(request, response) {
    const { name, description, price } = request.body;
    const product = await Product.create({
      name,
      description,
      price
    });
    await product.save();
    return response.json({ message: 'Product created!' });
  },
  async getProduct(request, response) {
    const productId = request.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return response.json(204).end();
    }

    return response.json(product);
  },
  async getProducts(request, response) {
    const products = await Product.find().sort('-createdAt');

    if (!products) {
      return response.status(204).end();
    }

    return response.json(products);
  },
  async updateProduct(request, response) {
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

  },
  async deleteProduct(request, response) {
    const productId = request.params.id;
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return response.json(204).end();
    }

    return response.json({ message: 'Product deleted!' });
  }
}
