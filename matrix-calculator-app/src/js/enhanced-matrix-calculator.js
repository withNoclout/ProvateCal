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
   * Symbolic Cross Product Operation (forces symbolic calculation)
   */
  crossProductSymbolicOperation(vectorA, vectorB) {
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
      // 2D symbolic cross product
      result = this.crossProduct2DSymbolic(vecA, vecB);
      description = `2D Symbolic Cross Product (A × B)`;
    } else if (vecA.length === 3) {
      // 3D symbolic cross product using your exact function
      result = this.crossProduct3DSymbolic(vecA, vecB);
      description = `3D Symbolic Cross Product (A × B)`;
    } else {
      throw new Error("Symbolic cross product is only defined for 2D or 3D vectors");
    }
    
    return {
      operation: 'crossProductSymbolic',
      symbol: '×',
      result: result,
      symbolicResult: result,
      matrixA: vectorA,
      matrixB: vectorB,
      description: description,
      isSymbolic: true
    };
  }

  /**
   * Simple 2D Cross Product for numeric vectors
   */
  crossProduct2D(vecA, vecB) {
    // Validate input
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Inputs must be arrays.");
    }
    if (vecA.length !== 2 || vecB.length !== 2) {
      throw new Error("Both vectors must have exactly 2 elements.");
    }
    
    // Convert to numbers if they're strings
    const a = [Number(vecA[0]), Number(vecA[1])];
    const b = [Number(vecB[0]), Number(vecB[1])];
    
    // Check if all elements are valid numbers
    if (a.some(isNaN) || b.some(isNaN)) {
      throw new Error("All elements must be valid numbers.");
    }

    // Cross product calculation (returns scalar for 2D)
    return a[0] * b[1] - a[1] * b[0];
  }

  /**
   * Simple 3D Cross Product for numeric vectors
   */
  crossProduct3D(vecA, vecB) {
    // Validate input
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Inputs must be arrays.");
    }
    if (vecA.length !== 3 || vecB.length !== 3) {
      throw new Error("Both vectors must have exactly 3 elements.");
    }
    
    // Convert to numbers if they're strings
    const a = [Number(vecA[0]), Number(vecA[1]), Number(vecA[2])];
    const b = [Number(vecB[0]), Number(vecB[1]), Number(vecB[2])];
    
    // Check if all elements are valid numbers
    if (a.some(isNaN) || b.some(isNaN)) {
      throw new Error("All elements must be valid numbers.");
    }

    // Cross product calculation
    return [
      a[1] * b[2] - a[2] * b[1], // i component
      a[2] * b[0] - a[0] * b[2], // j component
      a[0] * b[1] - a[1] * b[0]  // k component
    ];
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
    let symbolicResult = null;
    
    // Check if inputs contain variables (non-numeric values)
    const hasVariables = this.containsVariables(vecA) || this.containsVariables(vecB);
    
    if (vecA.length === 2) {
      // 2D cross product (returns scalar - the z-component)
      if (hasVariables) {
        // Symbolic calculation
        symbolicResult = this.crossProduct2DSymbolic(vecA, vecB);
        result = symbolicResult; // For display
        description = `2D Cross Product (A × B) - Symbolic`;
      } else {
        // Numeric calculation using simple function
        result = this.crossProduct2D(vecA, vecB);
        description = `2D Cross Product (A × B) = ${this.formatNumber(result)}`;
      }
    } else if (vecA.length === 3) {
      // 3D cross product (returns vector)
      if (hasVariables) {
        // Symbolic calculation
        symbolicResult = this.crossProduct3DSymbolic(vecA, vecB);
        result = symbolicResult; // For display
        description = `3D Cross Product (A × B) - Symbolic`;
      } else {
        // Numeric calculation using simple function
        result = this.crossProduct3D(vecA, vecB);
        description = `3D Cross Product (A × B)`;
        
        // Convert back to matrix format for display
        result = [[this.formatNumber(result[0])], [this.formatNumber(result[1])], [this.formatNumber(result[2])]];
      }
    } else {
      throw new Error("Cross product is only defined for 2D or 3D vectors");
    }
    
    return {
      operation: 'cross_product',
      symbol: '×',
      result: result,
      symbolicResult: symbolicResult,
      matrixA: vectorA,
      matrixB: vectorB,
      description: description,
      isSymbolic: hasVariables
    };
  }

  /**
   * Check if vector contains variables (non-numeric values)
   */
  containsVariables(vector) {
    return vector.some(element => {
      if (typeof element === 'string') {
        // Check if string contains variables (letters other than 'e' for scientific notation)
        return /[a-df-zA-DF-Z]/.test(element);
      }
      return false;
    });
  }

  /**
   * 2D Cross Product for Symbolic Variables
   */
  crossProduct2DSymbolic(vecA, vecB) {
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Both inputs must be arrays.");
    }
    if (vecA.length !== 2 || vecB.length !== 2) {
      throw new Error("Each vector must have exactly 2 elements.");
    }

    const expression = `(${vecA[0]}) * (${vecB[1]}) - (${vecA[1]}) * (${vecB[0]})`;

    try {
      const simplified = math.simplify(expression).toString();
      return this.makeUserFriendly(simplified);
    } catch (err) {
      console.error("Simplification error:", err);
      return this.makeUserFriendly(expression);
    }
  }

  /**
   * 3D Cross Product for Symbolic Variables (User's exact specification)
   */
  crossProduct3DSymbolic(vecA, vecB) {
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      throw new Error("Both inputs must be arrays.");
    }
    if (vecA.length !== 3 || vecB.length !== 3) {
      throw new Error("Each vector must have exactly 3 elements.");
    }

    const cross = [
      `(${vecA[1]}) * (${vecB[2]}) - (${vecA[2]}) * (${vecB[1]})`,
      `(${vecA[2]}) * (${vecB[0]}) - (${vecA[0]}) * (${vecB[2]})`,
      `(${vecA[0]}) * (${vecB[1]}) - (${vecA[1]}) * (${vecB[0]})`
    ];

    try {
      return cross.map(expr => {
        // First try Math.js simplification
        const simplified = math.simplify(expr).toString();
        // Then apply additional user-friendly simplifications
        return this.makeUserFriendly(simplified);
      });
    } catch (err) {
      console.error("Simplification error:", err);
      // Fallback to manual simplification
      return cross.map(expr => this.makeUserFriendly(expr));
    }
  }

  /**
   * Make mathematical expressions more user-friendly and ready-to-use
   */
  makeUserFriendly(expression) {
    if (!expression || typeof expression !== 'string') {
      return expression;
    }

    let result = expression;

    // Step 1: Remove unnecessary parentheses around single numbers/variables
    result = result.replace(/\(([a-zA-Z0-9]+)\)/g, '$1');

    // Step 2: Evaluate simple arithmetic (number * number) FIRST
    result = result.replace(/(\d+)\s*\*\s*(\d+)/g, (match, num1, num2) => {
      return (parseInt(num1) * parseInt(num2)).toString();
    });

    // Step 3: Handle coefficient multiplication patterns
    // Pattern: "coefficientVariable * number" -> "newCoefficientVariable"
    result = result.replace(/(\d+)([a-zA-Z]+)\s*\*\s*(\d+)/g, (match, coeff, variable, num) => {
      return (parseInt(coeff) * parseInt(num)) + variable;
    });
    
    // Pattern: "variable * number" -> "numberVariable" 
    result = result.replace(/([a-zA-Z]+)\s*\*\s*(\d+)/g, '$2$1');
    
    // Pattern: "number * coefficientVariable" -> "newCoefficientVariable"
    result = result.replace(/(\d+)\s*\*\s*(\d+)([a-zA-Z]+)/g, (match, num1, coeff, variable) => {
      return (parseInt(num1) * parseInt(coeff)) + variable;
    });
    
    // Pattern: "number * variable" -> "numberVariable"
    result = result.replace(/(\d+)\s*\*\s*([a-zA-Z]+)(?!\d)/g, '$1$2');

    // Step 4: Handle addition and subtraction with zero
    result = result.replace(/\s*\+\s*0\b/g, '');
    result = result.replace(/\b0\s*\+\s*/g, '');
    result = result.replace(/\s*-\s*0\b/g, '');

    // Step 5: Handle multiplication by zero -> result is 0
    result = result.replace(/0\s*\*\s*[^+\-\s]+/g, '0');
    result = result.replace(/[^+\-\s]+\s*\*\s*0/g, '0');

    // Step 6: Handle multiplication by 1
    result = result.replace(/1\s*\*\s*/g, '');
    result = result.replace(/\s*\*\s*1\b/g, '');

    // Step 7: Clean up spaces around operators
    result = result.replace(/\s*-\s*/g, ' - '); // Clean spaces around -
    result = result.replace(/\s*\+\s*/g, ' + '); // Clean spaces around +

    // Step 8: Handle expressions that start with operators
    result = result.replace(/^\s*\+\s*/, '');
    result = result.replace(/^\s*-\s*/, '-');

    // Step 9: Clean up double operators and extra spaces
    result = result.replace(/\+\s*-/g, '- ');
    result = result.replace(/-\s*\+/g, '- ');
    result = result.replace(/\s+/g, ' ');
    result = result.trim();

    // Step 10: Handle special case where coefficient is 1 (e.g., "1y" -> "y")
    result = result.replace(/\b1([a-zA-Z]+)/g, '$1');

    // Step 11: If result is empty or just operators, return 0
    if (!result || result.match(/^[-+\s]*$/)) {
      result = '0';
    }

    return result;
  }

  /**
   * Basic algebraic simplification fallback
   */
  basicAlgebraicSimplify(expression) {
    // Basic simplification: remove unnecessary parentheses around single numbers
    let simplified = expression;
    
    // Replace (number) with just number
    simplified = simplified.replace(/\((-?\d+(?:\.\d+)?)\)/g, '$1');
    
    // Simplify multiplication by 1
    simplified = simplified.replace(/1 \* /g, '');
    simplified = simplified.replace(/ \* 1/g, '');
    
    // Simplify multiplication by 0
    simplified = simplified.replace(/0 \* [^-+()]+/g, '0');
    simplified = simplified.replace(/[^-+()]+ \* 0/g, '0');
    
    // Basic arithmetic evaluation for simple cases
    try {
      // If it's just numbers and basic operations, evaluate it
      if (/^[\d\s+\-*/().]+$/.test(simplified)) {
        const evaluated = Function('"use strict"; return (' + simplified + ')')();
        if (!isNaN(evaluated) && isFinite(evaluated)) {
          return evaluated.toString();
        }
      }
    } catch (e) {
      // If evaluation fails, return the simplified expression
    }
    
    return simplified;
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
    
    // If it's already a 1D array (numeric or symbolic), return it
    if (typeof matrix[0] === 'number' || typeof matrix[0] === 'string') {
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
        return this.crossProductVectorsImproved(matrixA, matrixB);
      case 'cross_symbolic':
        return this.crossProductSymbolicOperation(matrixA, matrixB);
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
      'cross': '×',
      'cross_symbolic': '×'
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
      'cross': 'Vector Cross Product',
      'cross_symbolic': 'Symbolic Cross Product'
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
   * Format number to 2 decimal places
   */
  formatNumber(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      return '0.00';
    }
    return Math.abs(value) < 0.001 ? '0.00' : value.toFixed(2);
  }

  /**
   * Format matrix for display with brackets
   */
  formatMatrixDisplay(matrix, label = 'Result') {
    if (!matrix || matrix.length === 0) {
      return { 
        formatted: '0.00', 
        isMatrix: false, 
        dimensions: '1×1',
        label: label
      };
    }

    // Check if it's a scalar (single number)
    if (typeof matrix === 'number') {
      return { 
        formatted: this.formatNumber(matrix), 
        isMatrix: false, 
        dimensions: '1×1',
        label: label,
        type: 'scalar'
      };
    }

    // Check if it's a 1D array (vector)
    if (Array.isArray(matrix) && !Array.isArray(matrix[0])) {
      const formattedValues = matrix.map(val => this.formatNumber(val));
      return {
        formatted: formattedValues,
        isMatrix: true,
        dimensions: `1×${matrix.length}`,
        rows: 1,
        cols: matrix.length,
        label: label,
        type: 'vector'
      };
    }

    // It's a 2D matrix
    const rows = matrix.length;
    const cols = matrix[0].length;
    const formattedMatrix = matrix.map(row => 
      row.map(val => this.formatNumber(val))
    );

    return {
      formatted: formattedMatrix,
      isMatrix: true,
      dimensions: `${rows}×${cols}`,
      rows: rows,
      cols: cols,
      label: label,
      type: 'matrix'
    };
  }

  /**
   * Generate HTML for matrix display with brackets
   */
  generateMatrixHTML(matrixData) {
    if (!matrixData.isMatrix) {
      return `
        <div class="matrix-result-display">
          <div class="result-bracket-container">
            <div class="result-bracket left-bracket">
              <div class="result-bracket-top"></div>
              <div class="result-bracket-middle"></div>
              <div class="result-bracket-bottom"></div>
            </div>
            <div class="matrix-result-grid size-1x1">
              <div class="result-value scalar ${matrixData.type}" title="${matrixData.label}: ${matrixData.formatted}">
                ${matrixData.formatted}
              </div>
            </div>
            <div class="result-bracket right-bracket">
              <div class="result-bracket-top"></div>
              <div class="result-bracket-middle"></div>
              <div class="result-bracket-bottom"></div>
            </div>
          </div>
          <div class="result-matrix-label">${matrixData.label}</div>
        </div>
      `;
    }

    const sizeClass = `size-${matrixData.rows}x${matrixData.cols}`;
    let cellsHTML = '';

    if (matrixData.type === 'vector') {
      // Handle vector display
      for (let j = 0; j < matrixData.cols; j++) {
        cellsHTML += `
          <div class="result-value vector matrix-cell" title="${matrixData.label}[${j+1}]: ${matrixData.formatted[j]}">
            ${matrixData.formatted[j]}
          </div>
        `;
      }
    } else {
      // Handle matrix display
      for (let i = 0; i < matrixData.rows; i++) {
        for (let j = 0; j < matrixData.cols; j++) {
          cellsHTML += `
            <div class="result-value matrix matrix-cell" title="${matrixData.label}[${i+1},${j+1}]: ${matrixData.formatted[i][j]}">
              ${matrixData.formatted[i][j]}
            </div>
          `;
        }
      }
    }

    return `
      <div class="matrix-result-display">
        <div class="result-bracket-container">
          <div class="result-bracket left-bracket">
            <div class="result-bracket-top"></div>
            <div class="result-bracket-middle"></div>
            <div class="result-bracket-bottom"></div>
          </div>
          <div class="matrix-result-grid ${sizeClass}">
            ${cellsHTML}
          </div>
          <div class="result-bracket right-bracket">
            <div class="result-bracket-top"></div>
            <div class="result-bracket-middle"></div>
            <div class="result-bracket-bottom"></div>
          </div>
        </div>
        <div class="result-matrix-label">${matrixData.label} (${matrixData.dimensions})</div>
      </div>
    `;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedMatrixCalculator;
}
