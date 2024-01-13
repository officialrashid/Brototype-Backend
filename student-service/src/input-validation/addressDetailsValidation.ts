import { body } from 'express-validator';

export const addressDetailsValidationRules = [
  body('studentId')
    .notEmpty().withMessage('Student ID is required')
    .isString().withMessage('Student ID must be a string')
    .trim(),
  body('houseName')
    .notEmpty().withMessage('houseName is required')
    .isString().withMessage('houseName must be a string')
    .trim(),
    body('village')
    .notEmpty().withMessage('village is required')
    .isString().withMessage('village must be a string')
    .trim(),
    body('taluk')
    .notEmpty().withMessage('taluk is required')
    .isString().withMessage('taluk must be a string')
    .trim(),
    body('district')
    .notEmpty().withMessage('district is required')
    .isString().withMessage('district must be a string')
    .trim(),
    body('state')
    .notEmpty().withMessage('state is required')
    .isString().withMessage('state must be a string')
    .trim(),
    body('pincode')
    .notEmpty().withMessage('pincode is required')
    .isString().withMessage('pincode must be a string')
    .trim(),
   

  // Add other validation rules as needed for other inputs
];
