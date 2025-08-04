// This file contains unit tests for the equation-solving functions to verify their correctness.

import { solveEquations } from '../src/js/equation-solver';

describe('Equation Solver', () => {
    test('should solve 2 unknowns correctly', () => {
        const equations = [
            { a: 2, b: 3, c: 5 },
            { a: 1, b: -1, c: 1 }
        ];
        const result = solveEquations(equations);
        expect(result).toEqual({ x: 1, y: 1 });
    });

    test('should solve 3 unknowns correctly', () => {
        const equations = [
            { a: 1, b: 2, c: 3 },
            { a: 2, b: 3, c: 5 },
            { a: 3, b: 1, c: 4 }
        ];
        const result = solveEquations(equations);
        expect(result).toEqual({ x: 1, y: 1, z: 1 });
    });

    test('should solve 4 unknowns correctly', () => {
        const equations = [
            { a: 1, b: 1, c: 1, d: 1, e: 4 },
            { a: 2, b: 2, c: 2, d: 2, e: 8 },
            { a: 3, b: 3, c: 3, d: 3, e: 12 },
            { a: 4, b: 4, c: 4, d: 4, e: 16 }
        ];
        const result = solveEquations(equations);
        expect(result).toEqual({ x: 1, y: 1, z: 1, w: 1 });
    });
});