/**
 * Equation Solver - Linear Systems Solution Engine
 * Frontend Code Generation Agent Implementation
 * 
 * Solves systems of linear equations using Gaussian elimination and matrix methods
 * Supports 2, 3, and 4 unknowns with comprehensive error handling
 */

class EquationSolver {
  /**
   * Linear System Solver using Gaussian Elimination
   * Compatible with the provided use case format
   */
  solveLinearSystem(A, B) {
    // Make copies to avoid modifying original arrays
    const matrix = A.map(row => [...row]);
    const constants = [...B];
    const n = matrix.length;

    // Augment the matrix
    for (let i = 0; i < n; i++) {
      matrix[i].push(constants[i]);
    }

    // Gaussian Elimination
    for (let i = 0; i < n; i++) {
      // Make the diagonal element 1
      let factor = matrix[i][i];
      if (Math.abs(factor) < 1e-10) {
        throw new Error("No unique solution or infinite solutions.");
      }
      
      for (let j = 0; j <= n; j++) {
        matrix[i][j] = matrix[i][j] / factor;
      }

      // Eliminate other rows
      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        let ratio = matrix[k][i];
        for (let j = 0; j <= n; j++) {
          matrix[k][j] -= ratio * matrix[i][j];
        }
      }
    }

    // Extract results
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(matrix[i][n]);
    }

    return result;
  }

  /**
   * Main solve method - determines appropriate solver based on system size
   */
  solve(equationData) {
    const { equations, unknowns } = equationData;
    
    try {
      this.validateEquationSystem(equations, unknowns);
      
      switch (unknowns) {
        case 2:
          return this.solveTwoUnknowns(equations);
        case 3:
          return this.solveThreeUnknowns(equations);
        case 4:
          return this.solveFourUnknowns(equations);
        default:
          throw new Error(`Solving systems with ${unknowns} unknowns is not supported`);
      }
    } catch (error) {
      return {
        hasUniqueSolution: false,
        message: error.message,
        variables: []
      };
    }
  }

  /**
   * Solve system with 2 unknowns using Cramer's rule
   */
  solveTwoUnknowns(equations) {
    const [eq1, eq2] = equations;
    const [a, b] = eq1.coefficients;
    const [c, d] = eq2.coefficients;
    const e = eq1.result;
    const f = eq2.result;

    // Calculate determinant of coefficient matrix
    const determinant = a * d - b * c;

    if (Math.abs(determinant) < 1e-10) {
      // Check for infinite solutions or no solution
      if (this.areProportional([a, b, e], [c, d, f])) {
        return {
          hasUniqueSolution: false,
          message: 'System has infinite solutions (equations are dependent)',
          variables: []
        };
      } else {
        return {
          hasUniqueSolution: false,
          message: 'System has no solution (equations are inconsistent)',
          variables: []
        };
      }
    }

    // Use Cramer's rule
    const x = (e * d - b * f) / determinant;
    const y = (a * f - e * c) / determinant;

    return {
      hasUniqueSolution: true,
      message: 'Unique solution found',
      variables: [x, y],
      variableNames: ['x', 'y']
    };
  }

  /**
   * Solve system with 3 unknowns using Gaussian elimination
   */
  solveThreeUnknowns(equations) {
    // Create augmented matrix
    const augmented = equations.map(eq => [...eq.coefficients, eq.result]);
    
    try {
      // Perform Gaussian elimination
      const solution = this.gaussianElimination(augmented);
      
      if (solution.hasUniqueSolution) {
        return {
          hasUniqueSolution: true,
          message: 'Unique solution found',
          variables: solution.variables,
          variableNames: ['x', 'y', 'z']
        };
      } else {
        return solution;
      }
    } catch (error) {
      return {
        hasUniqueSolution: false,
        message: error.message,
        variables: []
      };
    }
  }

  /**
   * Solve system with 4 unknowns using Gaussian elimination
   */
  solveFourUnknowns(equations) {
    // Create augmented matrix
    const augmented = equations.map(eq => [...eq.coefficients, eq.result]);
    
    try {
      // Perform Gaussian elimination
      const solution = this.gaussianElimination(augmented);
      
      if (solution.hasUniqueSolution) {
        return {
          hasUniqueSolution: true,
          message: 'Unique solution found',
          variables: solution.variables,
          variableNames: ['x', 'y', 'z', 'w']
        };
      } else {
        return solution;
      }
    } catch (error) {
      return {
        hasUniqueSolution: false,
        message: error.message,
        variables: []
      };
    }
  }

  /**
   * Gaussian elimination with partial pivoting
   */
  gaussianElimination(augmented) {
    const n = augmented.length;
    const m = augmented[0].length;
    
    // Forward elimination
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

      // Check for zero pivot
      if (Math.abs(augmented[i][i]) < 1e-10) {
        // Check if this row is all zeros
        const isZeroRow = augmented[i].slice(0, n).every(val => Math.abs(val) < 1e-10);
        
        if (isZeroRow) {
          if (Math.abs(augmented[i][n]) < 1e-10) {
            return {
              hasUniqueSolution: false,
              message: 'System has infinite solutions (underdetermined)',
              variables: []
            };
          } else {
            return {
              hasUniqueSolution: false,
              message: 'System has no solution (inconsistent)',
              variables: []
            };
          }
        }
        
        // Try to find a non-zero element in this column
        let foundPivot = false;
        for (let k = i + 1; k < n; k++) {
          if (Math.abs(augmented[k][i]) > 1e-10) {
            [augmented[i], augmented[k]] = [augmented[k], augmented[i]];
            foundPivot = true;
            break;
          }
        }
        
        if (!foundPivot) {
          return {
            hasUniqueSolution: false,
            message: 'System is underdetermined or inconsistent',
            variables: []
          };
        }
      }

      // Eliminate column
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j < m; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }

    // Back substitution
    const variables = new Array(n);
    
    for (let i = n - 1; i >= 0; i--) {
      let sum = augmented[i][n];
      
      for (let j = i + 1; j < n; j++) {
        sum -= augmented[i][j] * variables[j];
      }
      
      if (Math.abs(augmented[i][i]) < 1e-10) {
        return {
          hasUniqueSolution: false,
          message: 'System is singular',
          variables: []
        };
      }
      
      variables[i] = sum / augmented[i][i];
    }

    return {
      hasUniqueSolution: true,
      variables: variables
    };
  }

  /**
   * Check if two arrays are proportional (for detecting dependent equations)
   */
  areProportional(arr1, arr2) {
    let ratio = null;
    
    for (let i = 0; i < arr1.length; i++) {
      if (Math.abs(arr1[i]) > 1e-10 || Math.abs(arr2[i]) > 1e-10) {
        if (Math.abs(arr1[i]) < 1e-10 || Math.abs(arr2[i]) < 1e-10) {
          return false; // One is zero, other is not
        }
        
        const currentRatio = arr2[i] / arr1[i];
        
        if (ratio === null) {
          ratio = currentRatio;
        } else if (Math.abs(ratio - currentRatio) > 1e-10) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Validate equation system input
   */
  validateEquationSystem(equations, unknowns) {
    if (!Array.isArray(equations) || equations.length === 0) {
      throw new Error('Equations array cannot be empty');
    }

    if (equations.length !== unknowns) {
      throw new Error(`Number of equations (${equations.length}) must equal number of unknowns (${unknowns})`);
    }

    for (let i = 0; i < equations.length; i++) {
      const eq = equations[i];
      
      if (!eq.coefficients || !Array.isArray(eq.coefficients)) {
        throw new Error(`Equation ${i + 1} must have coefficients array`);
      }
      
      if (eq.coefficients.length !== unknowns) {
        throw new Error(`Equation ${i + 1} must have ${unknowns} coefficients`);
      }
      
      if (typeof eq.result !== 'number' || !isFinite(eq.result)) {
        throw new Error(`Equation ${i + 1} must have a valid numeric result`);
      }
      
      for (let j = 0; j < eq.coefficients.length; j++) {
        if (typeof eq.coefficients[j] !== 'number' || !isFinite(eq.coefficients[j])) {
          throw new Error(`Equation ${i + 1}, coefficient ${j + 1} must be a valid number`);
        }
      }
    }

    return true;
  }

  /**
   * Format solution for display
   */
  formatSolution(solution) {
    if (!solution.hasUniqueSolution) {
      return solution.message;
    }

    const variableNames = solution.variableNames || 
      solution.variables.map((_, index) => String.fromCharCode(120 + index));
    
    const formatted = solution.variables.map((value, index) => 
      `${variableNames[index]} = ${value.toFixed(6)}`
    ).join('\n');

    return formatted;
  }

  /**
   * Verify solution by substituting back into original equations
   */
  verifySolution(equations, variables) {
    const tolerance = 1e-10;
    
    for (let i = 0; i < equations.length; i++) {
      const eq = equations[i];
      let leftSide = 0;
      
      for (let j = 0; j < eq.coefficients.length; j++) {
        leftSide += eq.coefficients[j] * variables[j];
      }
      
      if (Math.abs(leftSide - eq.result) > tolerance) {
        return {
          isValid: false,
          error: `Equation ${i + 1} verification failed: ${leftSide} ≠ ${eq.result}`
        };
      }
    }
    
    return { isValid: true };
  }

  /**
   * Get system properties (determinant, rank, etc.)
   */
  analyzeSystem(equations) {
    const coeffMatrix = equations.map(eq => eq.coefficients);
    const n = coeffMatrix.length;
    
    if (n !== coeffMatrix[0].length) {
      return {
        isSquare: false,
        determinant: null,
        rank: this.calculateRank(coeffMatrix)
      };
    }

    // Calculate determinant for square systems
    const determinant = this.calculateDeterminant(coeffMatrix);
    
    return {
      isSquare: true,
      determinant: determinant,
      rank: this.calculateRank(coeffMatrix),
      isSingular: Math.abs(determinant) < 1e-10
    };
  }

  /**
   * Calculate determinant of coefficient matrix
   */
  calculateDeterminant(matrix) {
    const calculator = new MatrixCalculator();
    return calculator.calculateDeterminant(matrix);
  }

  /**
   * Calculate rank of coefficient matrix
   */
  calculateRank(matrix) {
    const calculator = new MatrixCalculator();
    return calculator.calculateRank(matrix);
  }
}

// Legacy function exports for backward compatibility
function solveTwoUnknowns(a, b, c, d, e, f) {
  const solver = new EquationSolver();
  const equations = [
    { coefficients: [a, b], result: c },
    { coefficients: [d, e], result: f }
  ];
  return solver.solve({ equations, unknowns: 2 });
}

function solveThreeUnknowns(equations) {
  const solver = new EquationSolver();
  return solver.solve({ equations, unknowns: 3 });
}

function solveFourUnknowns(equations) {
  const solver = new EquationSolver();
  return solver.solve({ equations, unknowns: 4 });
}

function solveThreeUnknowns(a, b, c, d, e, f, g, h, i) {
    // Solves the equations:
    // a*x + b*y + c*z = d
    // e*x + f*y + g*z = h
    // i*x + j*y + k*z = l
    const denominator = a * (f * i - g * h) - b * (e * i - g * d) + c * (e * h - f * d);
    if (denominator === 0) {
        throw new Error("No unique solution exists.");
    }
    const x = (d * (f * i - g * h) - b * (h * i - g * d) + c * (h * e - f * d)) / denominator;
    const y = (a * (h * i - g * d) - d * (e * i - g * d) + c * (e * h - f * d)) / denominator;
    const z = (a * (f * d - b * h) - b * (e * d - f * d) + d * (e * h - f * d)) / denominator;
    return { x, y, z };
}

function solveFourUnknowns(a, b, c, d, e, f, g, h, i, j, k, l) {
    // Solves the equations:
    // a*x + b*y + c*z + d*w = e
    // f*x + g*y + h*z + i*w = j
    // k*x + l*y + m*z + n*w = o
    // p*x + q*y + r*z + s*w = t
    // Implementing a method to solve this system of equations
    // can be complex and typically requires matrix methods or numerical approaches.
    throw new Error("Four unknowns solver is not implemented yet.");
}

export { solveTwoUnknowns, solveThreeUnknowns, solveFourUnknowns };