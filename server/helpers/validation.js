import { body, param } from 'express-validator/check';


const signUpValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail()
    .trim(),
  body(
    'password',
    'Please enter a password at least 6 characters long',
  )
    .trim()
    .isLength({ min: 6 }),
  body('first_name', 'First name with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('last_name', 'Last name with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('address', 'Address with minimum of 2 characters long is required')
    .isLength({ min: 4 })
    .trim(),
];

const signInValidation = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail()
    .trim(),
  body(
    'password',
    'Please enter a password at least 6 characters long',
  )
    .trim()
    .isLength({ min: 6 }),
];

const createCarValidation = [
  body('name')
    .withMessage('First name with minimum of 2 characters long is required')
    .trim(),
  body('manufacturer', 'manufacturer with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('model', 'model with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('price', 'price must be numbers only')
    .isNumeric()
    .trim(),
  body('body_type', 'body type should be car or truck or van or trailer')
    .matches(/^car$|^truck$|^trailer$|^van$/i)
    .trim(),
  body('state', 'state should be new or old')
    .matches(/^new$|^old$/i)
    .trim(),
];

const carIdParam = [
  param('car_id', 'Invalid car id').isNumeric(),
];
const carPrice = [
  body('price', 'price should be numbers only').isNumeric(),
];
const carStatus = [
  body('status', 'status should be sold').matches(/^sold$/i),
];
const purchaseOrder = [
  body('car_id', 'car id should be numeric').isNumeric(),
  body('amount', 'price offered should be number').isNumeric(),
];
const orderPrice = [
  body('price', 'price should be numbers only').isNumeric(),
];
const orderIdParam = [
  param('order_id', 'Invalid order id').isNumeric(),
];

export default {
  signUpValidation,
  signInValidation,
  createCarValidation,
  carIdParam,
  carPrice,
  carStatus,
  purchaseOrder,
  orderPrice,
  orderIdParam,
};
