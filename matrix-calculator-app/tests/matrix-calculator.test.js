// This file contains unit tests for the matrix calculation functions to ensure they work as expected.

import { addMatrices, subtractMatrices, multiplyMatrices, determinant, inverse } from '../src/js/matrix-calculator.js';

describe('Matrix Calculator', () => {
    test('adds two 2x2 matrices', () => {
        const matrixA = [[1, 2], [3, 4]];
        const matrixB = [[5, 6], [7, 8]];
        const expected = [[6, 8], [10, 12]];
        expect(addMatrices(matrixA, matrixB)).toEqual(expected);
    });

    test('subtracts two 2x2 matrices', () => {
        const matrixA = [[5, 6], [7, 8]];
        const matrixB = [[1, 2], [3, 4]];
        const expected = [[4, 4], [4, 4]];
        expect(subtractMatrices(matrixA, matrixB)).toEqual(expected);
    });

    test('multiplies two 2x2 matrices', () => {
        const matrixA = [[1, 2], [3, 4]];
        const matrixB = [[5, 6], [7, 8]];
        const expected = [[19, 22], [43, 50]];
        expect(multiplyMatrices(matrixA, matrixB)).toEqual(expected);
    });

    test('calculates the determinant of a 2x2 matrix', () => {
        const matrix = [[1, 2], [3, 4]];
        const expected = -2;
        expect(determinant(matrix)).toEqual(expected);
    });

    test('calculates the inverse of a 2x2 matrix', () => {
        const matrix = [[4, 7], [2, 6]];
        const expected = [[0.6, -0.7], [-0.2, 0.4]];
        expect(inverse(matrix)).toEqual(expected);
    });

    test('adds two 3x3 matrices', () => {
        const matrixA = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        const matrixB = [[9, 8, 7], [6, 5, 4], [3, 2, 1]];
        const expected = [[10, 10, 10], [10, 10, 10], [10, 10, 10]];
        expect(addMatrices(matrixA, matrixB)).toEqual(expected);
    });

    test('calculates the determinant of a 3x3 matrix', () => {
        const matrix = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
        const expected = 1;
        expect(determinant(matrix)).toEqual(expected);
    });

    // Additional tests for other matrix operations can be added here
});