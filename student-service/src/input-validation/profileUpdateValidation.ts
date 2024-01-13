import { body } from 'express-validator';

export const profileUpdateValidationRules = [
  // body('selectedFile')
  //   .notEmpty().withMessage('Please select an image')
  //   .custom((value, { req }) => {
  //     if (!req.file) {
  //       throw new Error('File is required');
  //     }
  //     // You can add more specific file validation here if needed
  //     return true;
  //   }),
  body('firstName')
    .notEmpty().withMessage('First Name is required')
    .isString().withMessage('First Name must be a string')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('First Name must be between 1 and 255 characters')
    .custom((value) => /^[A-Z]/.test(value)).withMessage('First letter must be capital'),
 body('lastName')
    .notEmpty().withMessage('Last Name is required')
    .isString().withMessage('Last Name must be a string')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('Last Name must be between 1 and 255 characters')
    .custom((value) => /^[A-Z]/.test(value)).withMessage('First letter must be capital'),
body('domain')
    .notEmpty().withMessage('domain Name is required')
    .isString().withMessage('domain Name must be a string')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('domain Name must be between 1 and 255 characters')
    .custom((value) => /^[A-Z]/.test(value)).withMessage('First letter must be capital'),
body('batch')
    .notEmpty().withMessage('Batch is required')
    .isString().withMessage('Batch must be a string')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('Batch must be between 1 and 255 characters')
    .custom((value) => value === value?.toUpperCase()).withMessage('Batch must be in uppercase'),
];