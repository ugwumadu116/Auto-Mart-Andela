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

export default {
  signUpValidation,
  signInValidation,
};
