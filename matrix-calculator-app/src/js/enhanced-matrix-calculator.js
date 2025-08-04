/**
 * Enhanced Matrix Calculator with Two-Matrix Operations
 * Supports Matrix A and Matrix B with Add, Subtract, Dot Product, and Cross Product
 */

class EnhancedMatrixCalculator {
  constructor() {
    this.matrixA = [];
    this.matrixB = [];
    this.currentSize = null;
  }

  /**
   * Matrix Addition: A + B
   */
  addMatrices(matrixA, matrixB) {
    this.validateMatricesForOperation(matrixA, matrixB, 'addition');
    
    const result = [];
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    
    for (let i = 0; i < rows; i++) {
      result[i] = [];
      for (let j = 0; j < cols; j++) {
        result[i][j] = matrixA[i][j] + matrixB[i][j];
      }
    }
    
    return {
      operation: 'addition',
      symbol: '+',
      result: result,
      matrixA: matrixA,
      matrixB: matrixB,
      description: 'Matrix Addition (A + B)'
    };
  }

  /**
   * Matrix Subtraction: A - B
   */
  subtractMatrices(matrixA, matrixB) {
    this.validateMatricesForOperation(matrixA, matrixB, 'subtraction');
    
    const result = [];
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    
    for (let i = 0; i < rows; i++) {
      result[i] = [];
      for (let j = 0; j < cols; j++) {
        result[i][j] = matrixA[i][j] - matrixB[i][j];
      }
    }
    
    return {
      operation: 'subtraction',
      symbol: '−',
      result: result,
      matrixA: matrixA,
      matrixB: matrixB,
      description: 'Matrix Subtraction (A - B)'
    };
  }

  /**
   * Matrix Dot Product (Matrix Multiplication): A · B
   */
  dotProductMatrices(matrixA, matrixB) {
    this.validateMatricesForDotProduct(matrixA, matrixB);
    
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const result = [];
    
    for (let i = 0; i < rowsA; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        result[i][j] = 0;
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    
    return {
      operation: 'dot_product',
      symbol: '·',
      result: result,
      matrixA: matrixA,
      matrixB: matrixB,
      description: 'Matrix Multiplication (A · B)'
    };
  }

  /**
   * Vector Cross Product: A × B (for 3D vectors only)
   */
  crossProductVectors(vectorA, vectorB) {
    this.validateVectorsForCrossProduct(vectorA, vectorB);
    
    // Convert matrices to vectors if needed
    const vecA = this.matrixToVector(vectorA);
    const vecB = this.matrixToVector(vectorB);
    
    if (vecA.length !== 3 || vecB.length !== 3) {
      throw new Error('Cross product is only defined for 3D vectors');
    }
    
    const result = [
      vecA[1] * vecB[2] - vecA[2] * vecB[1],
      vecA[2] * vecB[0] - vecA[0] * vecB[2],
      vecA[0] * vecB[1] - vecA[1] * vecB[0]
    ];
    
    // Convert back to matrix format for display
    const resultMatrix = [[result[0]], [result[1]], [result[2]]];
    
    return {
      operation: 'cross_product',
      symbol: '×',
      result: resultMatrix,
      matrixA: vectorA,
      matrixB: vectorB,
      description: 'Vector Cross Product (A × B)'
    };
  }

  /**
   * Improved Dot Product for vectors (works with 1x2, 1x3, etc.)
   */
  dotProductVectors(vectorA, vectorB) {
    // Convert matrices to vectors if needed
    const vecA = this.matrixToVector(vectorA);
    const vecB = this.matrixToVector(vectorB);
    
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Inputs must be arrays");
    }
    
    if (vecA.length !== vecB.length) {
      throw new Error("Vectors must be of the same length");
    }
    
    const result = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
    
    return {
      operation: 'dot_product',
      symbol: '·',
      result: result,
      matrixA: vectorA,
      matrixB: vectorB,
      description: `Vector Dot Product (A · B) = ${result}`
    };
  }

  /**
   * Improved Cross Product for vectors (works with 1x2 and 1x3)
   */
  crossProductVectorsImproved(vectorA, vectorB) {
    // Convert matrices to vectors if needed
    const vecA = this.matrixToVector(vectorA);
    const vecB = this.matrixToVector(vectorB);
    
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Inputs must be arrays");
    }
    
    if (vecA.length !== vecB.length) {
      throw new Error("Vectors must be of the same length");
    }
    
    let result;
    let description;
    
    if (vecA.length === 2) {
      // 2D cross product (returns scalar - the z-component)
      result = vecA[0] * vecB[1] - vecA[1] * vecB[0];
      description = `2D Cross Product (A × B) = ${result}`;
    } else if (vecA.length === 3) {
      // 3D cross product (returns vector)
      result = [
        vecA[1] * vecB[2] - vecA[2] * vecB[1],
        vecA[2] * vecB[0] - vecA[0] * vecB[2],
        vecA[0] * vecB[1] - vecA[1] * vecB[0]
      ];
      description = `3D Cross Product (A × B)`;
      
      // Convert back to matrix format for display
      result = [[result[0]], [result[1]], [result[2]]];
    } else {
      throw new Error("Cross product is only defined for 2D or 3D vectors");
    }
    
    return {
      operation: 'cross_product',
      symbol: '×',
      result: result,
      matrixA: vectorA,
      matrixB: vectorB,
      description: description
    };
  }

  /**
   * Validate matrices for addition/subtraction (same dimensions required)
   */
  validateMatricesForOperation(matrixA, matrixB, operation) {
    if (!matrixA || !matrixB || !Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      throw new Error('Invalid matrices provided');
    }
    
    if (matrixA.length !== matrixB.length) {
      throw new Error(`For ${operation}, matrices must have the same number of rows`);
    }
    
    for (let i = 0; i < matrixA.length; i++) {
      if (!Array.isArray(matrixA[i]) || !Array.isArray(matrixB[i])) {
        throw new Error('Invalid matrix structure');
      }
      if (matrixA[i].length !== matrixB[i].length) {
        throw new Error(`For ${operation}, matrices must have the same dimensions`);
      }
    }
  }

  /**
   * Validate matrices for dot product (A cols must equal B rows)
   */
  validateMatricesForDotProduct(matrixA, matrixB) {
    if (!matrixA || !matrixB || !Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      throw new Error('Invalid matrices provided');
    }
    
    const colsA = matrixA[0] ? matrixA[0].length : 0;
    const rowsB = matrixB.length;
    
    if (colsA !== rowsB) {
      throw new Error(`For matrix multiplication, the number of columns in Matrix A (${colsA}) must equal the number of rows in Matrix B (${rowsB})`);
    }
  }

  /**
   * Validate vectors for cross product
   */
  validateVectorsForCrossProduct(vectorA, vectorB) {
    if (!vectorA || !vectorB || !Array.isArray(vectorA) || !Array.isArray(vectorB)) {
      throw new Error('Invalid vectors provided');
    }
    
    const vecA = this.matrixToVector(vectorA);
    const vecB = this.matrixToVector(vectorB);
    
    if (vecA.length !== 3 || vecB.length !== 3) {
      throw new Error('Cross product requires exactly 3-dimensional vectors');
    }
  }

  /**
   * Convert matrix to vector (flatten if needed)
   */
  matrixToVector(matrix) {
    if (!Array.isArray(matrix)) {
      throw new Error('Invalid matrix format');
    }
    
    // If it's already a 1D array, return it
    if (typeof matrix[0] === 'number') {
      return matrix;
    }
    
    // If it's a column vector (nx1 matrix)
    if (matrix[0] && matrix[0].length === 1) {
      return matrix.map(row => row[0]);
    }
    
    // If it's a row vector (1xn matrix)
    if (matrix.length === 1) {
      return matrix[0];
    }
    
    // For other cases, flatten the matrix
    const flattened = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        flattened.push(matrix[i][j]);
      }
    }
    return flattened;
  }

  /**
   * Perform the specified operation between two matrices
   */
  performOperation(matrixA, matrixB, operation) {
    switch (operation) {
      case 'add':
        return this.addMatrices(matrixA, matrixB);
      case 'subtract':
        return this.subtractMatrices(matrixA, matrixB);
      case 'dot':
        return this.dotProductMatrices(matrixA, matrixB);
      case 'cross':
        return this.crossProductVectors(matrixA, matrixB);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Get operation symbol for display
   */
  getOperationSymbol(operation) {
    const symbols = {
      'add': '+',
      'subtract': '−',
      'dot': '·',
      'cross': '×'
    };
    return symbols[operation] || operation;
  }

  /**
   * Get operation description
   */
  getOperationDescription(operation) {
    const descriptions = {
      'add': 'Matrix Addition',
      'subtract': 'Matrix Subtraction',
      'dot': 'Matrix Multiplication (Dot Product)',
      'cross': 'Vector Cross Product'
    };
    return descriptions[operation] || operation;
  }

  /**
   * Check if operation is valid for given matrix dimensions
   */
  isOperationValid(matrixA, matrixB, operation) {
    try {
      switch (operation) {
        case 'add':
        case 'subtract':
          this.validateMatricesForOperation(matrixA, matrixB, operation);
          return true;
        case 'dot':
          this.validateMatricesForDotProduct(matrixA, matrixB);
          return true;
        case 'cross':
          this.validateVectorsForCrossProduct(matrixA, matrixB);
          return true;
        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Get compatibility info for operations
   */
  getOperationCompatibility(matrixA, matrixB) {
    const compatibility = {
      add: this.isOperationValid(matrixA, matrixB, 'add'),
      subtract: this.isOperationValid(matrixA, matrixB, 'subtract'),
      dot: this.isOperationValid(matrixA, matrixB, 'dot'),
      cross: this.isOperationValid(matrixA, matrixB, 'cross')
    };
    
    return compatibility;
  }

  /**
   * Format result for display
   */
  formatResult(result) {
    if (typeof result === 'number') {
      return Math.abs(result) < 0.0001 ? '0' : result.toFixed(4);
    }
    
    if (Array.isArray(result)) {
      return result.map(row => 
        Array.isArray(row) ? 
        row.map(val => Math.abs(val) < 0.0001 ? '0' : val.toFixed(3)) :
        (Math.abs(row) < 0.0001 ? '0' : row.toFixed(3))
      );
    }
    
    return result;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedMatrixCalculator;
}
