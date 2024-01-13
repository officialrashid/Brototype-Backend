import { body, query } from 'express-validator';

export const weeklyPerformanceValidationRules = [
    query('studentId')
    .notEmpty().withMessage('Student ID is required')
    .isString().withMessage('Student ID must be a string')
    .trim(),

    query('batchId')
    .notEmpty().withMessage('Batch ID is required')
    .isString().withMessage('Batch ID must be a string')
    .trim(),
    query('selectWeek')
    .notEmpty().withMessage('Your not select week is required')
    .isString().withMessage('week must be a string')
    .trim(),

  // Add other validation rules as needed for other inputs
];
