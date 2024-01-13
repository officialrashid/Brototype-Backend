import { body } from 'express-validator';

export const requestExtentionValidationRules = [
  body('studentId')
    .notEmpty().withMessage('Student ID is required')
    .isString().withMessage('Student ID must be a string')
    .trim(),
  body('advisorId')
    .notEmpty().withMessage('advisorId is required')
    .isString().withMessage('advisorId must be a string')
    .trim(),
    body('extendDays')
    .notEmpty().withMessage('extend Days is required')
    .isString().withMessage('extend Dyas must be a string')
    .trim(),
    body('extendReason')
    .notEmpty().withMessage('extend reason is required')
    .isString().withMessage('extend reason must be a string')
    .trim(),
    body('fullName')
    .notEmpty().withMessage('fullName is required')
    .isString().withMessage('fullName must be a string')
    .trim(),
    body('batch')
    .notEmpty().withMessage('batch is required')
    .isString().withMessage('batch must be a string')
    .trim(),
    body('domain')
    .notEmpty().withMessage('domain is required')
    .isString().withMessage('domain must be a string')
    .trim(),
    body('currentWeek')
    .notEmpty().withMessage('currentWeek is required')
    .isString().withMessage('currentWeek must be a string')
    .trim(),

  // Add other validation rules as needed for other inputs
];
