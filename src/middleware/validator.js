const { body, check } = require('express-validator');

const User = require('../models/User');

const checkEmail = (value, { request }) => {
  return User.findOne({ email: value })
    .then(userData => {
      if (userData) {
        return Promise.reject('E-mail address already exists!');
      }
    })
  }

const signup = [
  body('name')
    .trim()
    .not()
    .isEmpty(),

  body('email')
    .isEmail()
    .withMessage('Enter with a valid email!')
    .custom(checkEmail)
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 6 }),
];

const signin = [
  body('email')
    .isEmail()
    .withMessage('Enter with a valid email!')
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 6 }),
];

const createProduct = [
  body('name')
    .trim()
    .not()
    .isEmpty(),

  body('description')
    .trim()
    .not()
    .isEmpty(),

  body('price')
    .isFloat(),
];

const createOrder = [
  body('products')
    .exists(),

  body('products')
    .isArray()
    .withMessage('Array is required!'),

  body('products.*.productId')
    .exists()
    .isAlphanumeric()
    .withMessage('ProductID is required!'),

  body('products.*.quantity')
    .exists()
    .isInt()
    .withMessage('Quantity is required!'),
];

const getUser = [
  check('id').isMongoId()
];

const getProduct = [
  check('id').isMongoId()
];

const updateProduct = [
  check('id').isMongoId(),
  body('price')
    .isFloat()
];

const deleteProduct = [
  check('id').isMongoId()
];

const getOrder = [
  check('id').isMongoId()
];

const updateOrder = [
  check('id').isMongoId(),
  body('status')
    .not()
    .isEmpty()
    .isIn(['OPENNED', 'CANCELED', 'CLOSED'])
];

const deleteOrder = [
  check('id').isMongoId()
];

const createDelivery = [
  body('orderId').isMongoId(),
  body('receiverName')
    .not()
    .isEmpty(),

  body('receiverCpf')
    .isLength({ min: 14, max: 14 })
    .isInt(),

  body('receiverIsOwner')
    .isBoolean(),
];

const getDelivery = [
  check('id').isMongoId()
];

const updateDelivery = [
  check('id').isMongoId(),
  body('orderId').isMongoId(),
  body('receiverName')
    .not()
    .isEmpty(),

  body('receiverCpf')
    .isLength({ min: 11, max: 11 })
    .isInt(),

  body('receiverIsOwner')
    .isBoolean(),
];

const deleteDelivery = [
  check('id').isMongoId()
];

module.exports = {
  signup,
  signin,
  createProduct,
  createOrder,
  getUser,
  getProduct,
  getOrder,
  updateOrder,
  updateProduct,
  deleteOrder,
  deleteProduct,
  createDelivery,
  getDelivery,
  updateDelivery,
  deleteDelivery
}
