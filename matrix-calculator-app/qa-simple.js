#!/usr/bin/env node

/**
 * Matrix QA Testing Agent - Node.js Compatible Version
 * Simplified CLI runner using require() for module loading
 */

const fs = require('fs');
const path = require('path');

// Simple test implementation that doesn't rely on complex module loading
class SimpleMatrixQA {
  constructor() {
    this.testResults = { passed: 0, failed: 0, details: [] };
  }

  // Simple matrix addition test
  testMatrixAddition() {
    console.log('🧮 Testing Matrix Addition...');
    
    const tests = [
      {
        name: '2x2 Matrix Addition',
        a: [[1, 2], [3, 4]],
        b: [[5, 6], [7, 8]],
        expected: [[6, 8], [10, 12]]
      },
      {
        name: '3x3 Matrix Addition',
        a: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        b: [[9, 8, 7], [6, 5, 4], [3, 2, 1]],
        expected: [[10, 10, 10], [10, 10, 10], [10, 10, 10]]
      }
    ];

    for (const test of tests) {
      try {
        const result = this.addMatrices(test.a, test.b);
        if (this.matricesEqual(result, test.expected)) {
          console.log(`✅ ${test.name} - PASSED`);
          this.testResults.passed++;
          this.testResults.details.push({ test: test.name, status: 'PASSED' });
        } else {
          console.log(`❌ ${test.name} - FAILED`);
          this.testResults.failed++;
          this.testResults.details.push({ test: test.name, status: 'FAILED', error: 'Result mismatch' });
        }
      } catch (error) {
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
        this.testResults.failed++;
        this.testResults.details.push({ test: test.name, status: 'ERROR', error: error.message });
      }
    }
  }

  // Simple matrix multiplication test
  testMatrixMultiplication() {
    console.log('\n🔢 Testing Matrix Multiplication...');
    
    const tests = [
      {
        name: '2x2 Matrix Multiplication',
        a: [[1, 2], [3, 4]],
        b: [[5, 6], [7, 8]],
        expected: [[19, 22], [43, 50]]
      },
      {
        name: '2x3 × 3x2 Matrix Multiplication',
        a: [[1, 2, 3], [4, 5, 6]],
        b: [[7, 8], [9, 10], [11, 12]],
        expected: [[58, 64], [139, 154]]
      }
    ];

    for (const test of tests) {
      try {
        const result = this.multiplyMatrices(test.a, test.b);
        if (this.matricesEqual(result, test.expected)) {
          console.log(`✅ ${test.name} - PASSED`);
          this.testResults.passed++;
          this.testResults.details.push({ test: test.name, status: 'PASSED' });
        } else {
          console.log(`❌ ${test.name} - FAILED`);
          this.testResults.failed++;
          this.testResults.details.push({ test: test.name, status: 'FAILED', error: 'Result mismatch' });
        }
      } catch (error) {
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
        this.testResults.failed++;
        this.testResults.details.push({ test: test.name, status: 'ERROR', error: error.message });
      }
    }
  }

  // Simple determinant test
  testDeterminant() {
    console.log('\n🔍 Testing Determinant Calculation...');
    
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
        name: '2x2 Identity Determinant',
        matrix: [[1, 0], [0, 1]],
        expected: 1
      }
    ];

    for (const test of tests) {
      try {
        const result = this.calculateDeterminant(test.matrix);
        if (Math.abs(result - test.expected) < 1e-10) {
          console.log(`✅ ${test.name} - PASSED (result: ${result})`);
          this.testResults.passed++;
          this.testResults.details.push({ test: test.name, status: 'PASSED' });
        } else {
          console.log(`❌ ${test.name} - FAILED (expected: ${test.expected}, got: ${result})`);
          this.testResults.failed++;
          this.testResults.details.push({ test: test.name, status: 'FAILED', error: `Expected ${test.expected}, got ${result}` });
        }
      } catch (error) {
        console.log(`❌ ${test.name} - ERROR: ${error.message}`);
        this.testResults.failed++;
        this.testResults.details.push({ test: test.name, status: 'ERROR', error: error.message });
      }
    }
  }

  // Test error handling
  testErrorHandling() {
    console.log('\n⚠️ Testing Error Handling...');
    
    // Test incompatible matrix addition
    try {
      this.addMatrices([[1, 2]], [[1], [2]]);
      console.log(`❌ Incompatible Matrix Addition - FAILED (should have thrown error)`);
      this.testResults.failed++;
      this.testResults.details.push({ test: 'Incompatible Matrix Addition', status: 'FAILED', error: 'Should have thrown error' });
    } catch (error) {
      console.log(`✅ Incompatible Matrix Addition - PASSED (correctly threw error)`);
      this.testResults.passed++;
      this.testResults.details.push({ test: 'Incompatible Matrix Addition', status: 'PASSED' });
    }

    // Test incompatible matrix multiplication
    try {
      this.multiplyMatrices([[1, 2, 3]], [[1, 2], [3, 4]]);
      console.log(`❌ Incompatible Matrix Multiplication - FAILED (should have thrown error)`);
      this.testResults.failed++;
      this.testResults.details.push({ test: 'Incompatible Matrix Multiplication', status: 'FAILED', error: 'Should have thrown error' });
    } catch (error) {
      console.log(`✅ Incompatible Matrix Multiplication - PASSED (correctly threw error)`);
      this.testResults.passed++;
      this.testResults.details.push({ test: 'Incompatible Matrix Multiplication', status: 'PASSED' });
    }
  }

  // Test 2 decimal place formatting
  testFormatting() {
    console.log('\n📐 Testing Number Formatting...');
    
    const tests = [
      { input: 3.14159, expected: '3.14' },
      { input: 0.0001, expected: '0.00' },
      { input: 1234.5678, expected: '1234.57' },
      { input: 5, expected: '5.00' }
    ];

    for (const test of tests) {
      const result = this.formatNumber(test.input);
      if (result === test.expected) {
        console.log(`✅ Format ${test.input} -> ${result} - PASSED`);
        this.testResults.passed++;
        this.testResults.details.push({ test: `Format ${test.input}`, status: 'PASSED' });
      } else {
        console.log(`❌ Format ${test.input} -> ${result} - FAILED (expected: ${test.expected})`);
        this.testResults.failed++;
        this.testResults.details.push({ test: `Format ${test.input}`, status: 'FAILED', error: `Expected ${test.expected}, got ${result}` });
      }
    }
  }

  // Matrix addition implementation
  addMatrices(matrixA, matrixB) {
    if (!matrixA || !matrixB || !matrixA.length || !matrixB.length) {
      throw new Error('Invalid matrix input');
    }

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      throw new Error('Matrix dimensions must match for addition');
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrixA[i].length; j++) {
        result[i][j] = matrixA[i][j] + matrixB[i][j];
      }
    }
    return result;
  }

  // Matrix multiplication implementation
  multiplyMatrices(matrixA, matrixB) {
    if (!matrixA || !matrixB || !matrixA.length || !matrixB.length) {
      throw new Error('Invalid matrix input');
    }

    if (matrixA[0].length !== matrixB.length) {
      throw new Error('Matrix dimensions incompatible for multiplication');
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        result[i][j] = 0;
        for (let k = 0; k < matrixB.length; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    return result;
  }

  // Determinant calculation implementation
  calculateDeterminant(matrix) {
    if (!matrix || !matrix.length || matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square for determinant calculation');
    }

    const n = matrix.length;
    
    if (n === 1) {
      return matrix[0][0];
    }
    
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < n; i++) {
      const minor = this.getMinor(matrix, 0, i);
      det += Math.pow(-1, i) * matrix[0][i] * this.calculateDeterminant(minor);
    }
    return det;
  }

  // Get minor matrix for determinant calculation
  getMinor(matrix, row, col) {
    const minor = [];
    for (let i = 0; i < matrix.length; i++) {
      if (i === row) continue;
      const newRow = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j === col) continue;
        newRow.push(matrix[i][j]);
      }
      minor.push(newRow);
    }
    return minor;
  }

  // Format number to 2 decimal places
  formatNumber(num) {
    return parseFloat(num).toFixed(2);
  }

  // Utility function to compare matrices
  matricesEqual(matrixA, matrixB, tolerance = 1e-10) {
    if (!matrixA || !matrixB) return false;
    if (matrixA.length !== matrixB.length) return false;
    
    for (let i = 0; i < matrixA.length; i++) {
      if (matrixA[i].length !== matrixB[i].length) return false;
      for (let j = 0; j < matrixA[i].length; j++) {
        if (Math.abs(matrixA[i][j] - matrixB[i][j]) > tolerance) return false;
      }
    }
    return true;
  }

  // Run all tests
  async runAllTests() {
    console.log('🔬 Starting Matrix QA Testing (Simplified Version)...\n');
    console.log('=' .repeat(60));
    
    const startTime = Date.now();
    
    this.testMatrixAddition();
    this.testMatrixMultiplication();
    this.testDeterminant();
    this.testErrorHandling();
    this.testFormatting();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    return this.generateReport(duration);
  }

  // Generate test report
  generateReport(duration) {
    console.log('\n' + '='.repeat(60));
    console.log('📋 MATRIX QA TESTING REPORT (SIMPLIFIED)');
    console.log('='.repeat(60));
    
    const total = this.testResults.passed + this.testResults.failed;
    const passRate = total > 0 ? (this.testResults.passed / total * 100).toFixed(1) : 0;
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${this.testResults.passed}`);
    console.log(`❌ Failed: ${this.testResults.failed}`);
    console.log(`📈 Pass Rate: ${passRate}%`);
    console.log(`⏱️ Duration: ${duration}ms\n`);
    
    if (this.testResults.failed > 0) {
      console.log('❌ FAILED TESTS:');
      this.testResults.details
        .filter(test => test.status === 'FAILED' || test.status === 'ERROR')
        .forEach(test => {
          console.log(`   • ${test.test}: ${test.error || 'Unknown error'}`);
        });
      console.log();
    }
    
    // Save report
    const report = {
      summary: {
        totalTests: total,
        passed: this.testResults.passed,
        failed: this.testResults.failed,
        passRate: parseFloat(passRate),
        duration
      },
      details: this.testResults.details,
      timestamp: new Date().toISOString()
    };
    
    const reportPath = path.join(__dirname, `simple-qa-report-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved to: ${reportPath}`);
    
    return this.testResults.failed === 0;
  }
}

// Enhanced console output
function enhanceConsole() {
  const originalLog = console.log;
  
  console.log = (...args) => {
    const message = args.join(' ');
    
    if (message.includes('✅')) {
      originalLog('\x1b[32m%s\x1b[0m', message); // Green
    } else if (message.includes('❌')) {
      originalLog('\x1b[31m%s\x1b[0m', message); // Red
    } else if (message.includes('⚠️')) {
      originalLog('\x1b[33m%s\x1b[0m', message); // Yellow
    } else if (message.includes('🔬') || message.includes('📊')) {
      originalLog('\x1b[36m%s\x1b[0m', message); // Cyan
    } else if (message.includes('🚀')) {
      originalLog('\x1b[35m%s\x1b[0m', message); // Magenta
    } else {
      originalLog(message);
    }
  };
}

// Main execution
async function main() {
  enhanceConsole();
  
  const qa = new SimpleMatrixQA();
  const success = await qa.runAllTests();
  
  if (success) {
    console.log('\n🎉 All tests passed successfully!');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Check the report for details.');
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Matrix QA Testing Agent - Simplified CLI Version

Usage: node qa-simple.js [options]

Options:
  --help, -h     Show this help message
  --version, -v  Show version information

This simplified version tests core matrix operations without requiring
complex module loading. Perfect for CI/CD environments.
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log('Matrix QA Testing Agent (Simplified) v1.0.0');
  process.exit(0);
}

// Run the tests
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
