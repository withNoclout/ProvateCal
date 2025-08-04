/**
 * Matrix Calculator - Mathematical Operations Engine
 * Frontend Code Generation Agent Implementation
 * 
 * Comprehensive matrix operations with error handling and validation
 * Following functional programming principles and mathematical accuracy
 */

class MatrixCalculator {
  /**
   * Calculate all possible operations for a given matrix
   */
  calculateAllOperations(matrixData) {
    const { matrix, rows, cols } = matrixData;
    const results = {};

    try {
      // Determinant (only for square matrices)
      if (rows === cols) {
        results.determinant = this.calculateDeterminant(matrix);
      }

      // Transpose (all matrices)
      results.transpose = this.transposeMatrix(matrix);

      // Trace (only for square matrices)
      if (rows === cols) {
        results.trace = this.calculateTrace(matrix);
      }

      // Inverse (only for square matrices with non-zero determinant)
      if (rows === cols && results.determinant !== 0) {
        try {
          results.inverse = this.calculateInverse(matrix);
        } catch (error) {
          results.inverse = 'Matrix is not invertible';
        }
      } else if (rows === cols) {
        results.inverse = 'Matrix is singular (determinant = 0)';
      }

      // Rank (all matrices)
      results.rank = this.calculateRank(matrix);

      // Row Echelon Form
      results.rowEchelonForm = this.getRowEchelonForm(matrix);

      // Vector operations (for matrices that can be treated as vectors)
      try {
        // If matrix is a single row or column, treat as vector
        if (rows === 1 || cols === 1) {
          const vector = rows === 1 ? matrix[0] : matrix.map(row => row[0]);
          results.vectorMagnitude = this.calculateVectorMagnitude(vector);
          
          // For 2D and 3D vectors, show normalized version
          if (vector.length === 2 || vector.length === 3) {
            results.normalizedVector = this.normalizeVector(vector);
          }
        }
        
        // If it's a square matrix, calculate eigenvalue-related properties
        if (rows === cols && rows <= 3) {
          // Matrix norm (Frobenius norm)
          results.frobeniusNorm = this.calculateFrobeniusNorm(matrix);
        }
        
      } catch (error) {
        // Vector operations failed, continue with matrix operations
        console.log('Vector operations not applicable:', error.message);
      }

    } catch (error) {
      throw new Error(`Matrix calculation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Calculate matrix determinant using recursive expansion
   */
  calculateDeterminant(matrix) {
    const n = matrix.length;

    // Base case for 1x1 matrix
    if (n === 1) {
      return matrix[0][0];
    }

    // Base case for 2x2 matrix
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // Recursive case for larger matrices
    let determinant = 0;
    
    for (let col = 0; col < n; col++) {
      const subMatrix = this.getSubMatrix(matrix, 0, col);
      const cofactor = Math.pow(-1, col) * matrix[0][col] * this.calculateDeterminant(subMatrix);
      determinant += cofactor;
    }

    return determinant;
  }

  /**
   * Get sub-matrix by removing specified row and column
   */
  getSubMatrix(matrix, excludeRow, excludeCol) {
    const subMatrix = [];
    
    for (let i = 0; i < matrix.length; i++) {
      if (i === excludeRow) continue;
      
      const row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j === excludeCol) continue;
        row.push(matrix[i][j]);
      }
      subMatrix.push(row);
    }

    return subMatrix;
  }

  /**
   * Transpose a matrix
   */
  transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];

    for (let j = 0; j < cols; j++) {
      const row = [];
      for (let i = 0; i < rows; i++) {
        row.push(matrix[i][j]);
      }
      transposed.push(row);
    }

    return transposed;
  }

  /**
   * Calculate matrix trace (sum of diagonal elements)
   */
  calculateTrace(matrix) {
    let trace = 0;
    const n = Math.min(matrix.length, matrix[0].length);
    
    for (let i = 0; i < n; i++) {
      trace += matrix[i][i];
    }

    return trace;
  }

  /**
   * Calculate matrix inverse using Gauss-Jordan elimination
   */
  calculateInverse(matrix) {
    const n = matrix.length;
    
    // Check if matrix is square
    if (n !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate inverse');
    }

    // Create augmented matrix [A|I]
    const augmented = [];
    for (let i = 0; i < n; i++) {
      const row = [...matrix[i]];
      // Add identity matrix
      for (let j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
      }
      augmented.push(row);
    }

    // Perform Gauss-Jordan elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }

      // Swap rows
      if (maxRow !== i) {
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
      }

      // Check for singular matrix
      if (Math.abs(augmented[i][i]) < 1e-10) {
        throw new Error('Matrix is singular');
      }

      // Scale pivot row
      const pivot = augmented[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      // Eliminate column
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    // Extract inverse matrix
    const inverse = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = n; j < 2 * n; j++) {
        row.push(augmented[i][j]);
      }
      inverse.push(row);
    }

    return inverse;
  }

  /**
   * Calculate matrix rank using row reduction
   */
  calculateRank(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create copy of matrix for row operations
    const workMatrix = matrix.map(row => [...row]);
    
    let rank = 0;
    let col = 0;

    for (let row = 0; row < rows && col < cols; row++) {
      // Find pivot
      let pivotRow = row;
      for (let i = row + 1; i < rows; i++) {
        if (Math.abs(workMatrix[i][col]) > Math.abs(workMatrix[pivotRow][col])) {
          pivotRow = i;
        }
      }

      // If pivot is effectively zero, move to next column
      if (Math.abs(workMatrix[pivotRow][col]) < 1e-10) {
        col++;
        row--; // Stay on same row, try next column
        continue;
      }

      // Swap rows
      if (pivotRow !== row) {
        [workMatrix[row], workMatrix[pivotRow]] = [workMatrix[pivotRow], workMatrix[row]];
      }

      // Scale pivot row
      const pivot = workMatrix[row][col];
      for (let j = 0; j < cols; j++) {
        workMatrix[row][j] /= pivot;
      }

      // Eliminate column
      for (let i = 0; i < rows; i++) {
        if (i !== row) {
          const factor = workMatrix[i][col];
          for (let j = 0; j < cols; j++) {
            workMatrix[i][j] -= factor * workMatrix[row][j];
          }
        }
      }

      rank++;
      col++;
    }

    return rank;
  }

  /**
   * Get row echelon form of matrix
   */
  getRowEchelonForm(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create copy for row operations
    const ref = matrix.map(row => [...row]);
    
    let currentRow = 0;

    for (let col = 0; col < cols && currentRow < rows; col++) {
      // Find pivot
      let pivotRow = currentRow;
      for (let row = currentRow + 1; row < rows; row++) {
        if (Math.abs(ref[row][col]) > Math.abs(ref[pivotRow][col])) {
          pivotRow = row;
        }
      }

      // Skip if pivot is effectively zero
      if (Math.abs(ref[pivotRow][col]) < 1e-10) {
        continue;
      }

      // Swap rows
      if (pivotRow !== currentRow) {
        [ref[currentRow], ref[pivotRow]] = [ref[pivotRow], ref[currentRow]];
      }

      // Eliminate below pivot
      for (let row = currentRow + 1; row < rows; row++) {
        const factor = ref[row][col] / ref[currentRow][col];
        for (let j = col; j < cols; j++) {
          ref[row][j] -= factor * ref[currentRow][j];
        }
      }

      currentRow++;
    }

    return ref;
  }

  /**
   * Matrix addition
   */
  addMatrices(matrixA, matrixB) {
    if (!this.haveSameDimensions(matrixA, matrixB)) {
      throw new Error('Matrices must have the same dimensions for addition');
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      const row = [];
      for (let j = 0; j < matrixA[i].length; j++) {
        row.push(matrixA[i][j] + matrixB[i][j]);
      }
      result.push(row);
    }

    return result;
  }

  /**
   * Matrix subtraction
   */
  subtractMatrices(matrixA, matrixB) {
    if (!this.haveSameDimensions(matrixA, matrixB)) {
      throw new Error('Matrices must have the same dimensions for subtraction');
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      const row = [];
      for (let j = 0; j < matrixA[i].length; j++) {
        row.push(matrixA[i][j] - matrixB[i][j]);
      }
      result.push(row);
    }

    return result;
  }

  /**
   * Matrix multiplication
   */
  multiplyMatrices(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
      throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
    }

    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
      const row = [];
      for (let j = 0; j < matrixB[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrixA[0].length; k++) {
          sum += matrixA[i][k] * matrixB[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }

    return result;
  }

  /**
   * Scalar multiplication
   */
  multiplyByScalar(matrix, scalar) {
    return matrix.map(row => row.map(element => element * scalar));
  }

  /**
   * Check if two matrices have the same dimensions
   */
  haveSameDimensions(matrixA, matrixB) {
    return matrixA.length === matrixB.length && 
           matrixA[0].length === matrixB[0].length;
  }

  /**
   * Validate matrix structure
   */
  validateMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      throw new Error('Matrix must be a non-empty array');
    }

    const cols = matrix[0].length;
    if (cols === 0) {
      throw new Error('Matrix rows cannot be empty');
    }

    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i].length !== cols) {
        throw new Error('All matrix rows must have the same number of columns');
      }
    }

    // Check for valid numbers
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (typeof matrix[i][j] !== 'number' || !isFinite(matrix[i][j])) {
          throw new Error(`Invalid matrix element at position [${i}][${j}]`);
        }
      }
    }

    return true;
  }

  /**
   * Round matrix elements to specified decimal places
   */
  roundMatrix(matrix, decimals = 6) {
    return matrix.map(row => 
      row.map(element => 
        Math.round(element * Math.pow(10, decimals)) / Math.pow(10, decimals)
      )
    );
  }

  /**
   * Calculate dot product of two vectors or matrices
   * For vectors: returns scalar (a₁b₁ + a₂b₂ + ... + aₙbₙ)
   * For matrices: returns matrix multiplication (A × B)
   */
  calculateDotProduct(vectorA, vectorB) {
    // Handle vector input (1D arrays)
    if (!Array.isArray(vectorA[0]) && !Array.isArray(vectorB[0])) {
      return this.calculateVectorDotProduct(vectorA, vectorB);
    }
    
    // Handle matrix input (2D arrays) - use matrix multiplication
    if (Array.isArray(vectorA[0]) && Array.isArray(vectorB[0])) {
      return this.multiplyMatrices(vectorA, vectorB);
    }
    
    // Handle mixed input - convert matrix to vector if possible
    const flatA = Array.isArray(vectorA[0]) ? this.flattenMatrix(vectorA) : vectorA;
    const flatB = Array.isArray(vectorB[0]) ? this.flattenMatrix(vectorB) : vectorB;
    
    return this.calculateVectorDotProduct(flatA, flatB);
  }

  /**
   * Calculate dot product of two vectors (1D arrays)
   */
  calculateVectorDotProduct(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same length for dot product');
    }

    let dotProduct = 0;
    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
    }

    return dotProduct;
  }

  /**
   * Calculate cross product of two 3D vectors
   * Returns a new 3D vector perpendicular to both input vectors
   * Formula: a × b = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)
   */
  calculateCrossProduct(vectorA, vectorB) {
    // Ensure we're working with 3D vectors
    if (vectorA.length !== 3 || vectorB.length !== 3) {
      throw new Error('Cross product is only defined for 3D vectors');
    }

    const [a1, a2, a3] = vectorA;
    const [b1, b2, b3] = vectorB;

    return [
      a2 * b3 - a3 * b2,  // i component
      a3 * b1 - a1 * b3,  // j component  
      a1 * b2 - a2 * b1   // k component
    ];
  }

  /**
   * Calculate cross product for 2D vectors (returns scalar - z-component)
   * For 2D vectors, cross product gives the magnitude of the z-component
   * Formula: a × b = a₁b₂ - a₂b₁
   */
  calculateCrossProduct2D(vectorA, vectorB) {
    if (vectorA.length !== 2 || vectorB.length !== 2) {
      throw new Error('2D cross product requires exactly 2D vectors');
    }

    return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];
  }

  /**
   * Calculate magnitude (length) of a vector
   * Formula: |v| = √(v₁² + v₂² + ... + vₙ²)
   */
  calculateVectorMagnitude(vector) {
    let sumOfSquares = 0;
    for (let i = 0; i < vector.length; i++) {
      sumOfSquares += vector[i] * vector[i];
    }
    return Math.sqrt(sumOfSquares);
  }

  /**
   * Calculate angle between two vectors in radians
   * Formula: θ = arccos((a·b) / (|a||b|))
   */
  calculateVectorAngle(vectorA, vectorB) {
    const dotProduct = this.calculateVectorDotProduct(vectorA, vectorB);
    const magnitudeA = this.calculateVectorMagnitude(vectorA);
    const magnitudeB = this.calculateVectorMagnitude(vectorB);
    
    if (magnitudeA === 0 || magnitudeB === 0) {
      throw new Error('Cannot calculate angle with zero vector');
    }
    
    const cosTheta = dotProduct / (magnitudeA * magnitudeB);
    
    // Clamp to [-1, 1] to handle floating point errors
    const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));
    
    return Math.acos(clampedCosTheta);
  }

  /**
   * Normalize a vector (make it unit length)
   * Formula: v̂ = v / |v|
   */
  normalizeVector(vector) {
    const magnitude = this.calculateVectorMagnitude(vector);
    
    if (magnitude === 0) {
      throw new Error('Cannot normalize zero vector');
    }
    
    return vector.map(component => component / magnitude);
  }

  /**
   * Flatten a matrix to a vector (concatenate all rows)
   */
  flattenMatrix(matrix) {
    return matrix.reduce((flat, row) => flat.concat(row), []);
  }

  /**
   * Project vector A onto vector B
   * Formula: proj_b(a) = ((a·b) / (b·b)) * b
   */
  projectVector(vectorA, vectorB) {
    const dotProduct = this.calculateVectorDotProduct(vectorA, vectorB);
    const magnitudeSquaredB = this.calculateVectorDotProduct(vectorB, vectorB);
    
    if (magnitudeSquaredB === 0) {
      throw new Error('Cannot project onto zero vector');
    }
    
    const scalar = dotProduct / magnitudeSquaredB;
    return vectorB.map(component => component * scalar);
  }

  /**
   * Check if two vectors are orthogonal (perpendicular)
   * Vectors are orthogonal if their dot product is zero
   */
  areVectorsOrthogonal(vectorA, vectorB, tolerance = 1e-10) {
    const dotProduct = this.calculateVectorDotProduct(vectorA, vectorB);
    return Math.abs(dotProduct) < tolerance;
  }

  /**
   * Check if two vectors are parallel
   * Vectors are parallel if their cross product is zero (for 3D) or cross product magnitude is zero (for 2D)
   */
  areVectorsParallel(vectorA, vectorB, tolerance = 1e-10) {
    if (vectorA.length === 2 && vectorB.length === 2) {
      const crossProduct = this.calculateCrossProduct2D(vectorA, vectorB);
      return Math.abs(crossProduct) < tolerance;
    } else if (vectorA.length === 3 && vectorB.length === 3) {
      const crossProduct = this.calculateCrossProduct(vectorA, vectorB);
      const magnitude = this.calculateVectorMagnitude(crossProduct);
      return magnitude < tolerance;
    } else {
      throw new Error('Parallel check supports only 2D or 3D vectors');
    }
  }

  /**
   * Calculate Frobenius norm of a matrix
   * Formula: ||A||_F = √(Σᵢⱼ |aᵢⱼ|²)
   */
  calculateFrobeniusNorm(matrix) {
    let sumOfSquares = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        sumOfSquares += matrix[i][j] * matrix[i][j];
      }
    }
    return Math.sqrt(sumOfSquares);
  }
}

// Legacy function exports for backward compatibility
function addMatrices(matrixA, matrixB) {
  const calculator = new MatrixCalculator();
  return calculator.addMatrices(matrixA, matrixB);
}

function subtractMatrices(matrixA, matrixB) {
  const calculator = new MatrixCalculator();
  return calculator.subtractMatrices(matrixA, matrixB);
}

function multiplyMatrices(matrixA, matrixB) {
  const calculator = new MatrixCalculator();
  return calculator.multiplyMatrices(matrixA, matrixB);
}

function transposeMatrix(matrix) {
  const calculator = new MatrixCalculator();
  return calculator.transposeMatrix(matrix);
}

function determinant(matrix) {
  const calculator = new MatrixCalculator();
  return calculator.calculateDeterminant(matrix);
}

function inverse(matrix) {
  const calculator = new MatrixCalculator();
  return calculator.calculateInverse(matrix);
}

function dotProduct(vectorA, vectorB) {
  const calculator = new MatrixCalculator();
  return calculator.calculateDotProduct(vectorA, vectorB);
}

function crossProduct(vectorA, vectorB) {
  const calculator = new MatrixCalculator();
  return calculator.calculateCrossProduct(vectorA, vectorB);
}

function vectorMagnitude(vector) {
  const calculator = new MatrixCalculator();
  return calculator.calculateVectorMagnitude(vector);
}