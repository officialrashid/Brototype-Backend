import { body } from 'express-validator';

export const educationDetailsValidationRules = [
  body('studentId')
    .notEmpty().withMessage('Student ID is required')
    .isString().withMessage('Student ID must be a string')
    .trim(),
  body('highestQualification')
    .notEmpty().withMessage('highestQualification is required')
    .isString().withMessage('highestQualification must be a string')
    .trim(),
    body('yearOfPassing')
    .notEmpty().withMessage('yearOfPassing is required')
    .isString().withMessage('yearOfPassing must be a string')
    .trim(),
    body('passPercentage')
    .notEmpty().withMessage('passPercentage is required')
    .isString().withMessage('passPercentage must be a string')
    .trim(),
    body('schoolOrCollegeOrInstituteName')
    .notEmpty().withMessage('schoolOrCollegeOrInstituteName is required')
    .isString().withMessage('schoolOrCollegeOrInstituteName must be a string')
    .trim(),


  // Add other validation rules as needed for other inputs
];
