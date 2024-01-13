import { body } from 'express-validator';

export const personalDetailsValidationRules = [
  body('studentId')
    .notEmpty().withMessage('Student ID is required')
    .isString().withMessage('Student ID must be a string')
    .trim(),
  body('dateOfBirth')
    .notEmpty().withMessage('dateOfBirth is required')
    .isString().withMessage('dateOfBirth must be a string')
    .trim(),
    body('age')
    .notEmpty().withMessage('age is required')
    .isString().withMessage('age must be a string')
    .trim(),
    body('email')
    .notEmpty().withMessage('email is required')
    .isString().withMessage('email must be a string')
    .trim(),
    body('gender')
    .notEmpty().withMessage('gender is required')
    .isString().withMessage('gender must be a string')
    .trim(),
    body('phone')
    .notEmpty().withMessage('phone is required')
    .isString().withMessage('phone must be a string')
    .trim(),
    body('fathersName')
    .notEmpty().withMessage('fathersName is required')
    .isString().withMessage('fathersName must be a string')
    .trim(),
    body('fathersContact')
    .notEmpty().withMessage('fathersContact is required')
    .isString().withMessage('fathersContact must be a string')
    .trim(),
    body('mothersName')
    .notEmpty().withMessage('mothersName is required')
    .isString().withMessage('mothersName must be a string')
    .trim(),
    body('mothersContact')
    .notEmpty().withMessage('mothersContact is required')
    .isString().withMessage('mothersContact must be a string')
    .trim(),


  // Add other validation rules as needed for other inputs
];
