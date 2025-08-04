/**
 * Enhanced IG-Style Matrix Calculator UI Handler with Two-Matrix Operations
 * Supports Matrix A and Matrix B with Add, Subtract, Dot Product, and Cross Product
 */

class EnhancedIGMatrixCalculatorUI extends IGMatrixCalculatorUI {
  constructor() {
    super();
    this.matrixA = [];
    this.matrixB = [];
    this.bindMatrixOperationEvents();
  }

  /**
   * Bind events for matrix operations
   */
  bindMatrixOperationEvents() {
    // Override the clear button to clear both matrices
    const clearMatrixBtn = document.getElementById('clear-matrices');
    if (clearMatrixBtn) {
      clearMatrixBtn.addEventListener('click', () => this.clearMatrices());
    }
  }

  /**
   * Enhanced matrix size selection for two matrices
   */
  selectMatrixSize(size) {
    // Update active state
    this.updateActiveButton('.size-tile', `[data-size="${size}"]`);
    
    this.currentMatrixSize = size;
    const [rows, cols] = size.split('x').map(Number);
    
    // Show input container with animation
    const container = document.getElementById('matrix-input-container');
    container.style.display = 'block';
    container.classList.add('slide-in');
    
    // Generate matrix grids for both Matrix A and Matrix B
    this.generateMatrixGrid('matrix-a-grid', rows, cols, 'a');
    this.generateMatrixGrid('matrix-b-grid', rows, cols, 'b');
    
    // Setup operation buttons
    this.setupOperationButtons();
    
    // Scroll to input area
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  /**
   * Generate matrix input grid for specified matrix (A or B)
   */
  generateMatrixGrid(gridId, rows, cols, matrixType) {
    const grid = document.getElementById(gridId);
    if (!grid) {
      console.error(`Grid with ID ${gridId} not found`);
      return;
    }
    
    grid.innerHTML = '';
    grid.className = `matrix-grid size-${rows}x${cols}`;
    
    // Create matrix inputs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = this.createMatrixInput(i, j, matrixType);
        grid.appendChild(input);
      }
    }

    // Hide result section initially
    const resultContainer = document.getElementById('matrix-equals-section');
    if (resultContainer) {
      resultContainer.style.display = 'none';
      resultContainer.classList.remove('show');
    }

    // Focus first input of Matrix A
    if (matrixType === 'a') {
      const firstInput = grid.querySelector('.matrix-input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 200);
      }
    }
  }

  /**
   * Create matrix input element with matrix type identifier
   */
  createMatrixInput(row, col, matrixType) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'matrix-input';
    input.id = `matrix-${matrixType}-${row}-${col}`;
    input.setAttribute('aria-label', `Matrix ${matrixType.toUpperCase()} element row ${row + 1}, column ${col + 1}`);
    input.placeholder = '0';
    input.step = '0.01';
    
    // Add input validation and navigation
    input.addEventListener('input', (e) => {
      this.validateNumericInput(e);
      this.updateOperationCompatibility();
    });
    input.addEventListener('keydown', (e) => this.handleMatrixNavigation(e, row, col, matrixType));
    
    return input;
  }

  /**
   * Setup operation buttons with compatibility checking
   */
  setupOperationButtons() {
    const operationButtons = document.querySelectorAll('.operation-btn');
    operationButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const operation = e.currentTarget.dataset.operation;
        this.performMatrixOperation(operation);
      });
    });
    
    // Initial compatibility check
    setTimeout(() => this.updateOperationCompatibility(), 100);
  }

  /**
   * Update operation button states based on matrix compatibility
   */
  updateOperationCompatibility() {
    const matrixA = this.getMatrixData('a');
    const matrixB = this.getMatrixData('b');
    
    if (!matrixA || !matrixB) return;
    
    // Check if matrices have any non-zero values
    const hasDataA = this.hasMatrixData(matrixA.matrix);
    const hasDataB = this.hasMatrixData(matrixB.matrix);
    
    if (!hasDataA || !hasDataB) {
      // Disable all buttons if matrices are empty
      document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
      });
      return;
    }

    const calculator = new EnhancedMatrixCalculator();
    const compatibility = calculator.getOperationCompatibility(matrixA.matrix, matrixB.matrix);
    
    // Update button states
    Object.entries(compatibility).forEach(([operation, isValid]) => {
      const btn = document.querySelector(`[data-operation="${operation}"]`);
      if (btn) {
        btn.disabled = !isValid;
        btn.classList.toggle('disabled', !isValid);
        
        if (!isValid) {
          btn.title = this.getOperationErrorMessage(operation, matrixA, matrixB);
        } else {
          btn.title = `Perform ${calculator.getOperationDescription(operation)}`;
        }
      }
    });
  }

  /**
   * Check if matrix has any non-zero data
   */
  hasMatrixData(matrix) {
    if (!matrix || !Array.isArray(matrix)) return false;
    
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== 0) return true;
      }
    }
    return false;
  }

  /**
   * Perform the selected matrix operation
   */
  async performMatrixOperation(operation) {
    try {
      const matrixA = this.getMatrixData('a');
      const matrixB = this.getMatrixData('b');
      
      if (!this.validateMatrixData(matrixA) || !this.validateMatrixData(matrixB)) {
        this.displayError('matrix', 'Please fill in all matrix values');
        return;
      }

      // Show loading state
      const operationBtn = document.querySelector(`[data-operation="${operation}"]`);
      const originalText = operationBtn.innerHTML;
      operationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Calculating...</span>';
      operationBtn.disabled = true;

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const calculator = new EnhancedMatrixCalculator();
      const result = calculator.performOperation(matrixA.matrix, matrixB.matrix, operation);

      this.displayMatrixOperationResult(result);
      this.addToHistory('matrix_operation', { matrixA, matrixB, operation }, result);

      // Reset button
      operationBtn.innerHTML = originalText;
      operationBtn.disabled = false;

    } catch (error) {
      this.displayError('matrix', error.message);
      console.error('Matrix operation error:', error);
      
      // Reset button on error
      const operationBtn = document.querySelector(`[data-operation="${operation}"]`);
      if (operationBtn) {
        operationBtn.innerHTML = operationBtn.innerHTML.replace(/<i[^>]*><\/i>\s*<span>.*<\/span>/, operationBtn.getAttribute('data-original-text') || 'Calculate');
        operationBtn.disabled = false;
      }
    }
  }

  /**
   * Display matrix operation result with IG-style animation
   */
  displayMatrixOperationResult(operationResult) {
    // Update operation symbol
    const operationSymbol = document.getElementById('operation-symbol');
    if (operationSymbol) {
      operationSymbol.textContent = operationResult.symbol;
    }

    // Show matrix result in equation format
    const resultContainer = document.getElementById('matrix-equals-section');
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if (!resultContainer || !resultGrid) return;
    
    // Clear previous results
    resultGrid.innerHTML = '';
    
    // Determine result dimensions
    const result = operationResult.result;
    const rows = result.length;
    const cols = result[0] ? result[0].length : 1;
    
    resultGrid.className = `matrix-result-grid size-${rows}x${cols}`;
    
    // Display result matrix
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const value = Array.isArray(result[i]) ? result[i][j] : result[i];
        const resultCell = this.createResultCell(value, 'matrix', i * cols + j);
        resultGrid.appendChild(resultCell);
      }
    }
    
    // Show the result container with animation
    resultContainer.style.display = 'flex';
    setTimeout(() => {
      resultContainer.classList.add('show');
    }, 100);
    
    // Update detailed results story card
    this.updateDetailedResults(operationResult);
    
    // Scroll to results
    setTimeout(() => {
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  /**
   * Update detailed results card
   */
  updateDetailedResults(operationResult) {
    const resultsCard = document.getElementById('matrix-results');
    const resultsContent = document.getElementById('matrix-result-content');
    
    let html = `
      <div class="operation-summary">
        <h4>${operationResult.description}</h4>
        <p>Matrix A ${operationResult.symbol} Matrix B = Result</p>
      </div>
      <div class="result-details">
        <div class="result-matrix">
          <h5>Result Matrix:</h5>
          <div class="matrix-display">
            ${this.formatMatrixForDisplay(operationResult.result)}
          </div>
        </div>
        <div class="operation-info">
          <p><strong>Operation:</strong> ${operationResult.description}</p>
          <p><strong>Dimensions:</strong> ${operationResult.result.length}×${operationResult.result[0] ? operationResult.result[0].length : 1}</p>
        </div>
      </div>
    `;
    
    resultsContent.innerHTML = html;
    resultsCard.style.display = 'block';
    resultsCard.classList.add('fade-in');
  }

  /**
   * Format matrix for display in results
   */
  formatMatrixForDisplay(matrix) {
    if (!Array.isArray(matrix)) return String(matrix);
    
    let html = '<div class="matrix-grid-display">';
    matrix.forEach(row => {
      html += '<div class="matrix-row">';
      if (Array.isArray(row)) {
        row.forEach(val => {
          const formattedVal = Math.abs(val) < 0.0001 ? '0' : val.toFixed(3);
          html += `<span class="matrix-cell">${formattedVal}</span>`;
        });
      } else {
        const formattedVal = Math.abs(row) < 0.0001 ? '0' : row.toFixed(3);
        html += `<span class="matrix-cell">${formattedVal}</span>`;
      }
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  /**
   * Get matrix data for specified matrix (A or B)
   */
  getMatrixData(matrixType) {
    if (!this.currentMatrixSize) return null;
    
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-${matrixType}-${i}-${j}`);
        if (!input) return null;
        const value = parseFloat(input.value) || 0;
        row.push(value);
      }
      matrix.push(row);
    }
    
    return { matrix, rows, cols, type: matrixType };
  }

  /**
   * Clear both matrices and results
   */
  clearMatrices() {
    const inputsA = document.querySelectorAll('[id^="matrix-a-"]');
    const inputsB = document.querySelectorAll('[id^="matrix-b-"]');
    
    [...inputsA, ...inputsB].forEach(input => {
      input.value = '';
      input.style.borderColor = 'var(--ig-gray-300)';
    });
    
    // Hide results sections
    const resultsCard = document.getElementById('matrix-results');
    const resultContainer = document.getElementById('matrix-equals-section');
    
    if (resultsCard) resultsCard.style.display = 'none';
    if (resultContainer) {
      resultContainer.style.display = 'none';
      resultContainer.classList.remove('show');
    }
    
    // Disable operation buttons
    document.querySelectorAll('.operation-btn').forEach(btn => {
      btn.disabled = true;
      btn.classList.add('disabled');
    });
    
    // Focus first input
    const firstInput = inputsA[0];
    if (firstInput) firstInput.focus();
  }

  /**
   * Get error message for incompatible operations
   */
  getOperationErrorMessage(operation, matrixA, matrixB) {
    const messages = {
      add: `Addition requires matrices of the same size. Matrix A is ${matrixA.rows}×${matrixA.cols}, Matrix B is ${matrixB.rows}×${matrixB.cols}`,
      subtract: `Subtraction requires matrices of the same size. Matrix A is ${matrixA.rows}×${matrixA.cols}, Matrix B is ${matrixB.rows}×${matrixB.cols}`,
      dot: `Multiplication requires Matrix A columns (${matrixA.cols}) to equal Matrix B rows (${matrixB.rows})`,
      cross: 'Cross product requires 3D vectors (3×1 or 1×3 matrices)'
    };
    return messages[operation] || 'Operation not compatible with current matrix dimensions';
  }

  /**
   * Handle keyboard navigation for matrix inputs with two-matrix support
   */
  handleMatrixNavigation(event, row, col, matrixType) {
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (col < cols - 1) {
        document.getElementById(`matrix-${matrixType}-${row}-${col + 1}`).focus();
      } else if (matrixType === 'a' && col === cols - 1) {
        // Jump to Matrix B, same row, first column
        const nextInput = document.getElementById(`matrix-b-${row}-0`);
        if (nextInput) nextInput.focus();
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (col > 0) {
        document.getElementById(`matrix-${matrixType}-${row}-${col - 1}`).focus();
      } else if (matrixType === 'b' && col === 0) {
        // Jump to Matrix A, same row, last column
        const prevInput = document.getElementById(`matrix-a-${row}-${cols - 1}`);
        if (prevInput) prevInput.focus();
      }
    } else if (event.key === 'ArrowDown' && row < rows - 1) {
      event.preventDefault();
      const nextInput = document.getElementById(`matrix-${matrixType}-${row + 1}-${col}`);
      if (nextInput) nextInput.focus();
    } else if (event.key === 'ArrowUp' && row > 0) {
      event.preventDefault();
      const prevInput = document.getElementById(`matrix-${matrixType}-${row - 1}-${col}`);
      if (prevInput) prevInput.focus();
    } else if (event.key === 'Tab') {
      // Allow default tab behavior but update compatibility
      setTimeout(() => this.updateOperationCompatibility(), 10);
    }
  }

  /**
   * Override the original displayError method
   */
  displayError(type, message) {
    // Create a more elegant error display for the IG interface
    const errorDiv = document.createElement('div');
    errorDiv.className = 'ig-error-message';
    errorDiv.innerHTML = `
      <div class="error-content">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add to the current section
    const currentSection = document.querySelector('.feed-section.active');
    if (currentSection) {
      currentSection.insertBefore(errorDiv, currentSection.firstChild);
      
      // Remove after 5 seconds
      setTimeout(() => {
        if (errorDiv.parentNode) {
          errorDiv.parentNode.removeChild(errorDiv);
        }
      }, 5000);
    }
  }
}

// Initialize the enhanced IG-style calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Replace the original UI with the enhanced version
  window.igMatrixUI = new EnhancedIGMatrixCalculatorUI();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedIGMatrixCalculatorUI;
}
