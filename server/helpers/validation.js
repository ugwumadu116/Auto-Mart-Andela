import { body } from 'express-validator/check';


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
  body('firstName', 'First name with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('lastName', 'Last name with minimum of 2 characters long is required')
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
  body('bodyType', 'body type should be car or truck or van or trailer')
    .matches(/^car$|^truck$|^trailer$|^van$/i)
    .trim(),
  body('state', 'state should be new or old')
    .matches(/^new$|^old$/i)
    .trim(),
];

export default {
  signUpValidation,
  signInValidation,
  createCarValidation,
};
