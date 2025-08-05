/**
 * Matrix QA Testing Agent for Web Math Application
 * Comprehensive automated testing suite for all matrix operations
 * 
 * @author QA AI Agent
 * @version 1.0.0
 * @date 2025-08-04
 */

class MatrixQAAgent {
  constructor() {
    this.testResults = {
      passed: [],
      failed: [],
      suggestions: []
    };
    
    // Import calculator classes for testing
    this.MatrixCalculator = typeof MatrixCalculator !== 'undefined' ? MatrixCalculator : null;
    this.EnhancedMatrixCalculator = typeof EnhancedMatrixCalculator !== 'undefined' ? EnhancedMatrixCalculator : null;
    this.EquationSolver = typeof EquationSolver !== 'undefined' ? EquationSolver : null;
  }

  /**
   * Main test execution function
   */
  async runAllTests() {
    console.log('🔬 Starting Matrix QA Testing Agent...\n');
    
    try {
      // Test Matrix Calculator
      if (this.MatrixCalculator) {
        await this.testMatrixCalculator();
      }
      
      // Test Enhanced Matrix Calculator
      if (this.EnhancedMatrixCalculator) {
        await this.testEnhancedMatrixCalculator();
      }
      
      // Test Equation Solver
      if (this.EquationSolver) {
        await this.testEquationSolver();
      }
      
      // Generate test report
      this.generateTestReport();
      
    } catch (error) {
      console.error('❌ QA Testing failed:', error);
    }
  }

  /**
   * Test Matrix Calculator class functions
   */
  async testMatrixCalculator() {
    console.log('📊 Testing MatrixCalculator class...\n');
    
    const calculator = new this.MatrixCalculator();
    
    // Test Matrix Addition
    await this.testMatrixAddition(calculator);
    
    // Test Matrix Subtraction
    await this.testMatrixSubtraction(calculator);
    
    // Test Matrix Multiplication
    await this.testMatrixMultiplication(calculator);
    
    // Test Determinant Calculation
    await this.testDeterminant(calculator);
    
    // Test Matrix Transpose
    await this.testTranspose(calculator);
    
    // Test Matrix Inverse
    await this.testInverse(calculator);
    
    // Test Trace Calculation
    await this.testTrace(calculator);
    
    // Test Vector Operations
    await this.testVectorOperations(calculator);
    
    // Test Edge Cases
    await this.testEdgeCases(calculator);
  }

  /**
   * Test Enhanced Matrix Calculator class functions
   */
  async testEnhancedMatrixCalculator() {
    console.log('🚀 Testing EnhancedMatrixCalculator class...\n');
    
    const calculator = new this.EnhancedMatrixCalculator();
    
    // Test Dual Matrix Operations
    await this.testDualMatrixAddition(calculator);
    await this.testDualMatrixSubtraction(calculator);
    await this.testVectorDotProduct(calculator);
    await this.testVectorCrossProduct(calculator);
    
    // Test Format Functions
    await this.testFormatting(calculator);
  }

  /**
   * Test matrix addition operations
   */
  async testMatrixAddition(calculator) {
    const tests = [
      {
        name: '2x2 Matrix Addition',
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        expected: [[6, 8], [10, 12]]
      },
      {
        name: '3x3 Matrix Addition',
        matrixA: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        matrixB: [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
        expected: [[10, 10, 10], [10, 10, 10], [10, 10, 10]]
      },
      {
        name: '1x2 Vector Addition',
        matrixA: [[1, 2]],
        matrixB: [[3, 4]],
        expected: [[4, 6]]
      },
      {
        name: '2x3 Matrix Addition',
        matrixA: [[1, 2, 3], [4, 5, 6]],
        matrixB: [[6, 5, 4], [3, 2, 1]],
        expected: [[7, 7, 7], [7, 7, 7]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.addMatrices(test.matrixA, test.matrixB);
        if (this.matricesEqual(result, test.expected)) {
          this.testResults.passed.push({
            function: 'addMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'addMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'addMatrices',
          test: test.name,
          input: { matrixA: test.matrixA, matrixB: test.matrixB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }

    // Test incompatible dimensions
    try {
      calculator.addMatrices([[1, 2]], [[1], [2]]);
      this.testResults.failed.push({
        function: 'addMatrices',
        test: 'Incompatible Dimensions Error Handling',
        error: 'Should have thrown error for incompatible dimensions'
      });
      console.log(`❌ Incompatible Dimensions Error Handling - FAILED`);
    } catch (error) {
      this.testResults.passed.push({
        function: 'addMatrices',
        test: 'Incompatible Dimensions Error Handling',
        error: error.message
      });
      console.log(`✅ Incompatible Dimensions Error Handling - PASSED`);
    }
  }

  /**
   * Test matrix subtraction operations
   */
  async testMatrixSubtraction(calculator) {
    const tests = [
      {
        name: '2x2 Matrix Subtraction',
        matrixA: [[5, 6], [7, 8]],
        matrixB: [[1, 2], [3, 4]],
        expected: [[4, 4], [4, 4]]
      },
      {
        name: '3x3 Matrix Subtraction',
        matrixA: [[10, 10, 10], [10, 10, 10], [10, 10, 10]],
        matrixB: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        expected: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.subtractMatrices(test.matrixA, test.matrixB);
        if (this.matricesEqual(result, test.expected)) {
          this.testResults.passed.push({
            function: 'subtractMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'subtractMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'subtractMatrices',
          test: test.name,
          input: { matrixA: test.matrixA, matrixB: test.matrixB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test matrix multiplication operations
   */
  async testMatrixMultiplication(calculator) {
    const tests = [
      {
        name: '2x2 Matrix Multiplication',
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        expected: [[19, 22], [43, 50]]
      },
      {
        name: '2x3 × 3x2 Matrix Multiplication',
        matrixA: [[1, 2, 3], [4, 5, 6]],
        matrixB: [[7, 8], [9, 10], [11, 12]],
        expected: [[58, 64], [139, 154]]
      },
      {
        name: '3x3 Matrix Multiplication',
        matrixA: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        matrixB: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.multiplyMatrices(test.matrixA, test.matrixB);
        if (this.matricesEqual(result, test.expected)) {
          this.testResults.passed.push({
            function: 'multiplyMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'multiplyMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'multiplyMatrices',
          test: test.name,
          input: { matrixA: test.matrixA, matrixB: test.matrixB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }

    // Test incompatible dimensions
    try {
      calculator.multiplyMatrices([[1, 2, 3]], [[1, 2], [3, 4]]);
      this.testResults.failed.push({
        function: 'multiplyMatrices',
        test: 'Incompatible Dimensions Error Handling',
        error: 'Should have thrown error for incompatible dimensions'
      });
      console.log(`❌ Multiplication Incompatible Dimensions - FAILED`);
    } catch (error) {
      this.testResults.passed.push({
        function: 'multiplyMatrices',
        test: 'Incompatible Dimensions Error Handling',
        error: error.message
      });
      console.log(`✅ Multiplication Incompatible Dimensions - PASSED`);
    }
  }

  /**
   * Test determinant calculations
   */
  async testDeterminant(calculator) {
    const tests = [
      {
        name: '2x2 Determinant',
        matrix: [[1, 2], [3, 4]],
        expected: -2
      },
      {
        name: '3x3 Determinant',
        matrix: [[1, 2, 3], [0, 1, 4], [5, 6, 0]],
        expected: 1
      },
      {
        name: '3x3 Identity Determinant',
        matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        expected: 1
      },
      {
        name: '2x2 Singular Matrix',
        matrix: [[1, 2], [2, 4]],
        expected: 0
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.calculateDeterminant(test.matrix);
        const tolerance = 1e-10;
        if (Math.abs(result - test.expected) < tolerance) {
          this.testResults.passed.push({
            function: 'calculateDeterminant',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED (result: ${result})`);
        } else {
          this.testResults.failed.push({
            function: 'calculateDeterminant',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected,
            error: `Expected ${test.expected}, got ${result}`
          });
          console.log(`❌ ${test.name} - FAILED (expected: ${test.expected}, got: ${result})`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateDeterminant',
          test: test.name,
          input: test.matrix,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test matrix transpose operations
   */
  async testTranspose(calculator) {
    const tests = [
      {
        name: '2x2 Transpose',
        matrix: [[1, 2], [3, 4]],
        expected: [[1, 3], [2, 4]]
      },
      {
        name: '2x3 Transpose',
        matrix: [[1, 2, 3], [4, 5, 6]],
        expected: [[1, 4], [2, 5], [3, 6]]
      },
      {
        name: '1x3 Vector Transpose',
        matrix: [[1, 2, 3]],
        expected: [[1], [2], [3]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.transposeMatrix(test.matrix);
        if (this.matricesEqual(result, test.expected)) {
          this.testResults.passed.push({
            function: 'transposeMatrix',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'transposeMatrix',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'transposeMatrix',
          test: test.name,
          input: test.matrix,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test matrix inverse operations
   */
  async testInverse(calculator) {
    const tests = [
      {
        name: '2x2 Inverse',
        matrix: [[4, 7], [2, 6]],
        expected: [[0.6, -0.7], [-0.2, 0.4]]
      },
      {
        name: '2x2 Identity Inverse',
        matrix: [[1, 0], [0, 1]],
        expected: [[1, 0], [0, 1]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.calculateInverse(test.matrix);
        if (this.matricesEqual(result, test.expected, 1e-10)) {
          this.testResults.passed.push({
            function: 'calculateInverse',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'calculateInverse',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateInverse',
          test: test.name,
          input: test.matrix,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }

    // Test singular matrix
    try {
      calculator.calculateInverse([[1, 2], [2, 4]]);
      this.testResults.failed.push({
        function: 'calculateInverse',
        test: 'Singular Matrix Error Handling',
        error: 'Should have thrown error for singular matrix'
      });
      console.log(`❌ Singular Matrix Error Handling - FAILED`);
    } catch (error) {
      this.testResults.passed.push({
        function: 'calculateInverse',
        test: 'Singular Matrix Error Handling',
        error: error.message
      });
      console.log(`✅ Singular Matrix Error Handling - PASSED`);
    }
  }

  /**
   * Test trace calculations
   */
  async testTrace(calculator) {
    const tests = [
      {
        name: '2x2 Trace',
        matrix: [[1, 2], [3, 4]],
        expected: 5
      },
      {
        name: '3x3 Trace',
        matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        expected: 15
      },
      {
        name: '3x3 Identity Trace',
        matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        expected: 3
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.calculateTrace(test.matrix);
        if (Math.abs(result - test.expected) < 1e-10) {
          this.testResults.passed.push({
            function: 'calculateTrace',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED (result: ${result})`);
        } else {
          this.testResults.failed.push({
            function: 'calculateTrace',
            test: test.name,
            input: test.matrix,
            output: result,
            expected: test.expected,
            error: `Expected ${test.expected}, got ${result}`
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateTrace',
          test: test.name,
          input: test.matrix,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test vector operations
   */
  async testVectorOperations(calculator) {
    // Test Dot Product
    const dotTests = [
      {
        name: '2D Vector Dot Product',
        vectorA: [1, 2],
        vectorB: [3, 4],
        expected: 11
      },
      {
        name: '3D Vector Dot Product',
        vectorA: [1, 2, 3],
        vectorB: [4, 5, 6],
        expected: 32
      }
    ];

    for (const test of dotTests) {
      try {
        const result = calculator.calculateVectorDotProduct(test.vectorA, test.vectorB);
        if (Math.abs(result - test.expected) < 1e-10) {
          this.testResults.passed.push({
            function: 'calculateVectorDotProduct',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'calculateVectorDotProduct',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result,
            expected: test.expected,
            error: `Expected ${test.expected}, got ${result}`
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateVectorDotProduct',
          test: test.name,
          input: { vectorA: test.vectorA, vectorB: test.vectorB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }

    // Test Cross Product
    const crossTests = [
      {
        name: '3D Vector Cross Product',
        vectorA: [1, 2, 3],
        vectorB: [4, 5, 6],
        expected: [-3, 6, -3]
      },
      {
        name: '3D Vector Cross Product (orthogonal)',
        vectorA: [1, 0, 0],
        vectorB: [0, 1, 0],
        expected: [0, 0, 1]
      }
    ];

    for (const test of crossTests) {
      try {
        const result = calculator.calculateCrossProduct(test.vectorA, test.vectorB);
        if (this.vectorsEqual(result, test.expected)) {
          this.testResults.passed.push({
            function: 'calculateCrossProduct',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'calculateCrossProduct',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result,
            expected: test.expected,
            error: 'Output does not match expected result'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateCrossProduct',
          test: test.name,
          input: { vectorA: test.vectorA, vectorB: test.vectorB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }

    // Test Vector Magnitude
    const magnitudeTests = [
      {
        name: '2D Vector Magnitude',
        vector: [3, 4],
        expected: 5
      },
      {
        name: '3D Vector Magnitude',
        vector: [1, 2, 2],
        expected: 3
      }
    ];

    for (const test of magnitudeTests) {
      try {
        const result = calculator.calculateVectorMagnitude(test.vector);
        if (Math.abs(result - test.expected) < 1e-10) {
          this.testResults.passed.push({
            function: 'calculateVectorMagnitude',
            test: test.name,
            input: test.vector,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'calculateVectorMagnitude',
            test: test.name,
            input: test.vector,
            output: result,
            expected: test.expected,
            error: `Expected ${test.expected}, got ${result}`
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'calculateVectorMagnitude',
          test: test.name,
          input: test.vector,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test edge cases and error handling
   */
  async testEdgeCases(calculator) {
    console.log('\n🔍 Testing Edge Cases...\n');

    // Test empty matrices
    try {
      calculator.addMatrices([], []);
      this.testResults.failed.push({
        function: 'addMatrices',
        test: 'Empty Matrix Handling',
        error: 'Should handle empty matrices gracefully'
      });
      console.log(`❌ Empty Matrix Handling - FAILED`);
    } catch (error) {
      this.testResults.passed.push({
        function: 'addMatrices',
        test: 'Empty Matrix Handling',
        error: error.message
      });
      console.log(`✅ Empty Matrix Handling - PASSED`);
    }

    // Test 1x1 matrices
    try {
      const result = calculator.addMatrices([[5]], [[3]]);
      if (this.matricesEqual(result, [[8]])) {
        this.testResults.passed.push({
          function: 'addMatrices',
          test: '1x1 Matrix Addition',
          input: { matrixA: [[5]], matrixB: [[3]] },
          output: result,
          expected: [[8]]
        });
        console.log(`✅ 1x1 Matrix Addition - PASSED`);
      } else {
        this.testResults.failed.push({
          function: 'addMatrices',
          test: '1x1 Matrix Addition',
          error: 'Incorrect result for 1x1 matrices'
        });
        console.log(`❌ 1x1 Matrix Addition - FAILED`);
      }
    } catch (error) {
      this.testResults.failed.push({
        function: 'addMatrices',
        test: '1x1 Matrix Addition',
        error: error.message
      });
      console.log(`❌ 1x1 Matrix Addition - ERROR: ${error.message}`);
    }

    // Test very large numbers
    try {
      const largeMatrix = [[1e10, 2e10], [3e10, 4e10]];
      const result = calculator.calculateDeterminant(largeMatrix);
      if (!isNaN(result) && isFinite(result)) {
        this.testResults.passed.push({
          function: 'calculateDeterminant',
          test: 'Large Number Handling',
          input: largeMatrix,
          output: result
        });
        console.log(`✅ Large Number Handling - PASSED`);
      } else {
        this.testResults.failed.push({
          function: 'calculateDeterminant',
          test: 'Large Number Handling',
          error: 'Result is not a valid number'
        });
        console.log(`❌ Large Number Handling - FAILED`);
      }
    } catch (error) {
      this.testResults.failed.push({
        function: 'calculateDeterminant',
        test: 'Large Number Handling',
        error: error.message
      });
      console.log(`❌ Large Number Handling - ERROR: ${error.message}`);
    }

    // Test very small numbers (near zero)
    try {
      const smallMatrix = [[1e-10, 2e-10], [3e-10, 4e-10]];
      const result = calculator.calculateDeterminant(smallMatrix);
      if (!isNaN(result) && isFinite(result)) {
        this.testResults.passed.push({
          function: 'calculateDeterminant',
          test: 'Small Number Handling',
          input: smallMatrix,
          output: result
        });
        console.log(`✅ Small Number Handling - PASSED`);
      } else {
        this.testResults.failed.push({
          function: 'calculateDeterminant',
          test: 'Small Number Handling',
          error: 'Result is not a valid number'
        });
        console.log(`❌ Small Number Handling - FAILED`);
      }
    } catch (error) {
      this.testResults.failed.push({
        function: 'calculateDeterminant',
        test: 'Small Number Handling',
        error: error.message
      });
      console.log(`❌ Small Number Handling - ERROR: ${error.message}`);
    }
  }

  /**
   * Test Enhanced Matrix Calculator dual operations
   */
  async testDualMatrixAddition(calculator) {
    const tests = [
      {
        name: 'Enhanced 2x2 Matrix Addition',
        matrixA: [[1, 2], [3, 4]],
        matrixB: [[5, 6], [7, 8]],
        expected: [[6, 8], [10, 12]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.addMatrices(test.matrixA, test.matrixB);
        if (result && result.result && this.matricesEqual(result.result, test.expected)) {
          this.testResults.passed.push({
            function: 'EnhancedMatrixCalculator.addMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result.result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'EnhancedMatrixCalculator.addMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected,
            error: 'Enhanced calculator should return result object'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'EnhancedMatrixCalculator.addMatrices',
          test: test.name,
          input: { matrixA: test.matrixA, matrixB: test.matrixB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test Enhanced Matrix Calculator subtraction
   */
  async testDualMatrixSubtraction(calculator) {
    const tests = [
      {
        name: 'Enhanced 2x2 Matrix Subtraction',
        matrixA: [[5, 6], [7, 8]],
        matrixB: [[1, 2], [3, 4]],
        expected: [[4, 4], [4, 4]]
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.subtractMatrices(test.matrixA, test.matrixB);
        if (result && result.result && this.matricesEqual(result.result, test.expected)) {
          this.testResults.passed.push({
            function: 'EnhancedMatrixCalculator.subtractMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result.result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'EnhancedMatrixCalculator.subtractMatrices',
            test: test.name,
            input: { matrixA: test.matrixA, matrixB: test.matrixB },
            output: result,
            expected: test.expected,
            error: 'Enhanced calculator should return result object'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'EnhancedMatrixCalculator.subtractMatrices',
          test: test.name,
          input: { matrixA: test.matrixA, matrixB: test.matrixB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test vector dot product operations
   */
  async testVectorDotProduct(calculator) {
    const tests = [
      {
        name: '1x2 Vector Dot Product',
        vectorA: [[1, 2]],
        vectorB: [[3, 4]],
        expected: 11
      },
      {
        name: '1x3 Vector Dot Product',
        vectorA: [[1, 2, 3]],
        vectorB: [[4, 5, 6]],
        expected: 32
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.dotProductVectors(test.vectorA, test.vectorB);
        if (result && typeof result.result === 'number' && Math.abs(result.result - test.expected) < 1e-10) {
          this.testResults.passed.push({
            function: 'EnhancedMatrixCalculator.dotProductVectors',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result.result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'EnhancedMatrixCalculator.dotProductVectors',
            test: test.name,
            input: { vectorA: test.vectorA, vectorB: test.vectorB },
            output: result,
            expected: test.expected,
            error: 'Vector dot product result incorrect'
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'EnhancedMatrixCalculator.dotProductVectors',
          test: test.name,
          input: { vectorA: test.vectorA, vectorB: test.vectorB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test vector cross product operations
   */
  async testVectorCrossProduct(calculator) {
    const tests = [
      {
        name: '1x2 Vector Cross Product (2D)',
        vectorA: [[1, 2]],
        vectorB: [[3, 4]],
        expected: -2 // 1*4 - 2*3 = -2
      },
      {
        name: '1x3 Vector Cross Product (3D)',
        vectorA: [[1, 2, 3]],
        vectorB: [[4, 5, 6]],
        expected: [[-3], [6], [-3]] // Cross product result as column vector
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.crossProductVectorsImproved(test.vectorA, test.vectorB);
        
        if (test.name.includes('2D')) {
          // For 2D, expect scalar result
          if (result && typeof result.result === 'number' && Math.abs(result.result - test.expected) < 1e-10) {
            this.testResults.passed.push({
              function: 'EnhancedMatrixCalculator.crossProductVectorsImproved',
              test: test.name,
              input: { vectorA: test.vectorA, vectorB: test.vectorB },
              output: result.result,
              expected: test.expected
            });
            console.log(`✅ ${test.name} - PASSED`);
          } else {
            this.testResults.failed.push({
              function: 'EnhancedMatrixCalculator.crossProductVectorsImproved',
              test: test.name,
              input: { vectorA: test.vectorA, vectorB: test.vectorB },
              output: result,
              expected: test.expected,
              error: '2D Cross product result incorrect'
            });
            console.log(`❌ ${test.name} - FAILED`);
          }
        } else {
          // For 3D, expect vector result
          if (result && result.result && this.matricesEqual(result.result, test.expected)) {
            this.testResults.passed.push({
              function: 'EnhancedMatrixCalculator.crossProductVectorsImproved',
              test: test.name,
              input: { vectorA: test.vectorA, vectorB: test.vectorB },
              output: result.result,
              expected: test.expected
            });
            console.log(`✅ ${test.name} - PASSED`);
          } else {
            this.testResults.failed.push({
              function: 'EnhancedMatrixCalculator.crossProductVectorsImproved',
              test: test.name,
              input: { vectorA: test.vectorA, vectorB: test.vectorB },
              output: result,
              expected: test.expected,
              error: '3D Cross product result incorrect'
            });
            console.log(`❌ ${test.name} - FAILED`);
          }
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'EnhancedMatrixCalculator.crossProductVectorsImproved',
          test: test.name,
          input: { vectorA: test.vectorA, vectorB: test.vectorB },
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test formatting functions
   */
  async testFormatting(calculator) {
    const tests = [
      {
        name: 'Number Formatting (2 decimal places)',
        input: 3.14159,
        expected: '3.14'
      },
      {
        name: 'Small Number Formatting',
        input: 0.0001,
        expected: '0.00'
      },
      {
        name: 'Large Number Formatting',
        input: 1234.5678,
        expected: '1234.57'
      }
    ];

    for (const test of tests) {
      try {
        const result = calculator.formatNumber(test.input);
        if (result === test.expected) {
          this.testResults.passed.push({
            function: 'EnhancedMatrixCalculator.formatNumber',
            test: test.name,
            input: test.input,
            output: result,
            expected: test.expected
          });
          console.log(`✅ ${test.name} - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'EnhancedMatrixCalculator.formatNumber',
            test: test.name,
            input: test.input,
            output: result,
            expected: test.expected,
            error: `Expected ${test.expected}, got ${result}`
          });
          console.log(`❌ ${test.name} - FAILED`);
        }
      } catch (error) {
        this.testResults.failed.push({
          function: 'EnhancedMatrixCalculator.formatNumber',
          test: test.name,
          input: test.input,
          error: error.message
        });
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      }
    }
  }

  /**
   * Test equation solver
   */
  async testEquationSolver() {
    if (!this.EquationSolver) {
      console.log('⚠️ EquationSolver not available for testing\n');
      return;
    }

    console.log('📐 Testing EquationSolver class...\n');
    
    const solver = new this.EquationSolver();
    
    // Test 2x2 system
    const equations2x2 = [
      { coefficients: [2, 3], constant: 13 },
      { coefficients: [1, -1], constant: -1 }
    ];
    
    try {
      const result = solver.solveLinearSystem(equations2x2);
      if (result.hasUniqueSolution) {
        // Expected solution: x = 2, y = 3
        const expected = [2, 3];
        const tolerance = 1e-10;
        
        if (result.variables.length === 2 && 
            Math.abs(result.variables[0] - expected[0]) < tolerance &&
            Math.abs(result.variables[1] - expected[1]) < tolerance) {
          this.testResults.passed.push({
            function: 'EquationSolver.solveLinearSystem',
            test: '2x2 Linear System',
            input: equations2x2,
            output: result.variables,
            expected: expected
          });
          console.log(`✅ 2x2 Linear System - PASSED`);
        } else {
          this.testResults.failed.push({
            function: 'EquationSolver.solveLinearSystem',
            test: '2x2 Linear System',
            input: equations2x2,
            output: result.variables,
            expected: expected,
            error: 'Solution values do not match expected'
          });
          console.log(`❌ 2x2 Linear System - FAILED`);
        }
      } else {
        this.testResults.failed.push({
          function: 'EquationSolver.solveLinearSystem',
          test: '2x2 Linear System',
          input: equations2x2,
          error: 'Should have found unique solution'
        });
        console.log(`❌ 2x2 Linear System - FAILED (No unique solution found)`);
      }
    } catch (error) {
      this.testResults.failed.push({
        function: 'EquationSolver.solveLinearSystem',
        test: '2x2 Linear System',
        input: equations2x2,
        error: error.message
      });
      console.log(`❌ 2x2 Linear System - ERROR: ${error.message}`);
    }
  }

  /**
   * Utility function to compare matrices with tolerance
   */
  matricesEqual(matrixA, matrixB, tolerance = 1e-10) {
    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      return false;
    }
    
    if (matrixA.length !== matrixB.length) {
      return false;
    }
    
    for (let i = 0; i < matrixA.length; i++) {
      if (!Array.isArray(matrixA[i]) || !Array.isArray(matrixB[i])) {
        return false;
      }
      
      if (matrixA[i].length !== matrixB[i].length) {
        return false;
      }
      
      for (let j = 0; j < matrixA[i].length; j++) {
        if (Math.abs(matrixA[i][j] - matrixB[i][j]) > tolerance) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Utility function to compare vectors with tolerance
   */
  vectorsEqual(vectorA, vectorB, tolerance = 1e-10) {
    if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
      return false;
    }
    
    if (vectorA.length !== vectorB.length) {
      return false;
    }
    
    for (let i = 0; i < vectorA.length; i++) {
      if (Math.abs(vectorA[i] - vectorB[i]) > tolerance) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Generate comprehensive test report
   */
  generateTestReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📋 MATRIX QA TESTING REPORT');
    console.log('='.repeat(80));
    
    const totalTests = this.testResults.passed.length + this.testResults.failed.length;
    const passRate = totalTests > 0 ? (this.testResults.passed.length / totalTests * 100).toFixed(1) : 0;
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${this.testResults.passed.length}`);
    console.log(`❌ Failed: ${this.testResults.failed.length}`);
    console.log(`📈 Pass Rate: ${passRate}%\n`);
    
    // Group results by function
    const functionGroups = {};
    
    [...this.testResults.passed, ...this.testResults.failed].forEach(test => {
      if (!functionGroups[test.function]) {
        functionGroups[test.function] = { passed: [], failed: [] };
      }
      
      if (this.testResults.passed.includes(test)) {
        functionGroups[test.function].passed.push(test);
      } else {
        functionGroups[test.function].failed.push(test);
      }
    });
    
    // Print detailed results
    console.log('🔍 DETAILED RESULTS BY FUNCTION:\n');
    
    Object.keys(functionGroups).sort().forEach(functionName => {
      const group = functionGroups[functionName];
      const total = group.passed.length + group.failed.length;
      const rate = total > 0 ? (group.passed.length / total * 100).toFixed(1) : 0;
      
      console.log(`📦 ${functionName}`);
      console.log(`   Pass Rate: ${rate}% (${group.passed.length}/${total})`);
      
      if (group.failed.length > 0) {
        console.log(`   ❌ Failed Tests:`);
        group.failed.forEach(test => {
          console.log(`      • ${test.test}: ${test.error || 'Unknown error'}`);
        });
      }
      
      if (group.passed.length > 0) {
        console.log(`   ✅ Passed Tests: ${group.passed.map(t => t.test).join(', ')}`);
      }
      
      console.log();
    });
    
    // Generate suggestions
    this.generateSuggestions();
    
    // Export to JSON format
    const report = {
      summary: {
        totalTests,
        passed: this.testResults.passed.length,
        failed: this.testResults.failed.length,
        passRate: parseFloat(passRate)
      },
      functionGroups,
      suggestions: this.testResults.suggestions,
      timestamp: new Date().toISOString()
    };
    
    console.log('📄 JSON Report:');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  }

  /**
   * Generate improvement suggestions
   */
  generateSuggestions() {
    console.log('🛠️ IMPROVEMENT SUGGESTIONS:\n');
    
    const suggestions = [];
    
    // Analyze failed tests for patterns
    const failedFunctions = [...new Set(this.testResults.failed.map(test => test.function))];
    
    failedFunctions.forEach(functionName => {
      const failures = this.testResults.failed.filter(test => test.function === functionName);
      
      if (failures.some(f => f.error && f.error.includes('incompatible'))) {
        suggestions.push({
          function: functionName,
          issue: 'Dimension Validation',
          suggestion: 'Improve input validation to check matrix dimensions before operations'
        });
      }
      
      if (failures.some(f => f.error && f.error.includes('singular'))) {
        suggestions.push({
          function: functionName,
          issue: 'Singular Matrix Handling',
          suggestion: 'Add better error messages and handling for singular matrices'
        });
      }
      
      if (failures.some(f => f.error && f.error.includes('empty'))) {
        suggestions.push({
          function: functionName,
          issue: 'Empty Input Handling',
          suggestion: 'Add validation for empty matrices and provide meaningful error messages'
        });
      }
      
      if (failures.some(f => f.error && f.error.includes('number'))) {
        suggestions.push({
          function: functionName,
          issue: 'Numerical Precision',
          suggestion: 'Review numerical precision handling and consider using better tolerance values'
        });
      }
    });
    
    // Add general suggestions
    if (this.testResults.failed.length > 0) {
      suggestions.push({
        function: 'General',
        issue: 'Error Handling',
        suggestion: 'Implement consistent error handling across all matrix operations'
      });
      
      suggestions.push({
        function: 'General',
        issue: 'Input Validation',
        suggestion: 'Add comprehensive input validation for all matrix functions'
      });
    }
    
    if (suggestions.length === 0) {
      suggestions.push({
        function: 'General',
        issue: 'Optimization',
        suggestion: 'All tests passed! Consider adding performance optimizations and more edge case tests'
      });
    }
    
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion.function} - ${suggestion.issue}`);
      console.log(`   💡 ${suggestion.suggestion}\n`);
    });
    
    this.testResults.suggestions = suggestions;
  }
}

// Auto-run tests if in Node.js environment or when loaded
if (typeof window === 'undefined') {
  // Node.js environment
  console.log('Matrix QA Agent loaded. Run: const qa = new MatrixQAAgent(); qa.runAllTests();');
} else {
  // Browser environment - auto-run
  document.addEventListener('DOMContentLoaded', () => {
    const qa = new MatrixQAAgent();
    qa.runAllTests();
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MatrixQAAgent;
}
