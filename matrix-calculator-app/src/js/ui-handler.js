/**
 * UI Handler - Matrix Calculator Application
 * Frontend Code Generation Agent Implementation
 * 
 * Manages user interactions, dynamic UI generation, and state management
 * Following atomic design principles and modern JavaScript patterns
 */

class MatrixCalculatorUI {
  constructor() {
    this.currentMatrixSize = null;
    this.currentEquationSize = null;
    this.matrixData = [];
    this.equationData = [];
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.bindEvents();
    this.setupAccessibility();
    console.log('Matrix Calculator UI initialized');
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Matrix size selection
    this.bindMatrixSizeSelection();
    
    // Equation size selection
    this.bindEquationSizeSelection();
    
    // Calculator actions
    this.bindCalculatorActions();
    
    // Keyboard navigation
    this.bindKeyboardEvents();
  }

  /**
   * Matrix size selection event handlers
   */
  bindMatrixSizeSelection() {
    const matrixSizeButtons = document.querySelectorAll('.matrix-size-selector .size-btn');
    
    matrixSizeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const size = e.currentTarget.dataset.size;
        this.selectMatrixSize(size);
      });
    });
  }

  /**
   * Equation size selection event handlers
   */
  bindEquationSizeSelection() {
    const equationSizeButtons = document.querySelectorAll('.equation-size-selector .size-btn');
    
    equationSizeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const unknowns = parseInt(e.currentTarget.dataset.unknowns);
        this.selectEquationSize(unknowns);
      });
    });
  }

  /**
   * Calculator action event handlers
   */
  bindCalculatorActions() {
    // Matrix calculation
    const calculateMatrixBtn = document.getElementById('calculate-matrix');
    const clearMatrixBtn = document.getElementById('clear-matrix');
    
    if (calculateMatrixBtn) {
      calculateMatrixBtn.addEventListener('click', () => this.calculateMatrix());
    }
    
    if (clearMatrixBtn) {
      clearMatrixBtn.addEventListener('click', () => this.clearMatrix());
    }

    // Equation solving
    const solveEquationBtn = document.getElementById('solve-equation');
    const clearEquationBtn = document.getElementById('clear-equation');
    
    if (solveEquationBtn) {
      solveEquationBtn.addEventListener('click', () => this.solveEquations());
    }
    
    if (clearEquationBtn) {
      clearEquationBtn.addEventListener('click', () => this.clearEquations());
    }
  }

  /**
   * Keyboard navigation support
   */
  bindKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      // Enter key on size buttons
      if (e.key === 'Enter' && e.target.classList.contains('size-btn')) {
        e.target.click();
      }
      
      // Tab navigation improvements
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
  }

  /**
   * Select matrix size and generate input grid
   */
  selectMatrixSize(size) {
    // Update active state
    this.updateActiveButton('.matrix-size-selector .size-btn', `[data-size="${size}"]`);
    
    this.currentMatrixSize = size;
    const [rows, cols] = size.split('x').map(Number);
    
    // Show input container
    const container = document.getElementById('matrix-input-container');
    container.style.display = 'block';
    
    // Generate matrix grid
    this.generateMatrixGrid(rows, cols);
    
    // Accessibility announcement
    this.announceToScreenReader(`Selected ${size} matrix. Input fields are now available.`);
  }

  /**
   * Select equation size and generate input fields
   */
  selectEquationSize(unknowns) {
    // Update active state
    this.updateActiveButton('.equation-size-selector .size-btn', `[data-unknowns="${unknowns}"]`);
    
    this.currentEquationSize = unknowns;
    
    // Show input container
    const container = document.getElementById('equation-input-container');
    container.style.display = 'block';
    
    // Generate equation grid
    this.generateEquationGrid(unknowns);
    
    // Accessibility announcement
    this.announceToScreenReader(`Selected ${unknowns} unknowns. Equation input fields are now available.`);
  }

  /**
   * Generate dynamic matrix input grid
   */
  generateMatrixGrid(rows, cols) {
    const grid = document.getElementById('matrix-grid');
    grid.innerHTML = '';
    
    // Add size class for styling
    grid.className = `matrix-grid size-${rows}x${cols}`;
    
    // Create matrix inputs with proper labeling
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = this.createMatrixInput(i, j);
        grid.appendChild(input);
      }
    }

    // Hide result section initially
    const equalsSection = document.getElementById('matrix-equals-section');
    if (equalsSection) {
      equalsSection.style.display = 'none';
      equalsSection.classList.remove('show');
    }

    // Focus first input
    const firstInput = grid.querySelector('.matrix-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  /**
   * Generate dynamic equation input grid
   */
  generateEquationGrid(unknowns) {
    const grid = document.getElementById('equation-grid');
    grid.innerHTML = '';
    
    // Create equation inputs
    for (let i = 0; i < unknowns; i++) {
      const equationRow = this.createEquationRow(i, unknowns);
      grid.appendChild(equationRow);
    }

    // Focus first input
    const firstInput = grid.querySelector('.equation-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  /**
   * Create individual matrix input element
   */
  createMatrixInput(row, col) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'matrix-input';
    input.id = `matrix-${row}-${col}`;
    input.setAttribute('aria-label', `Matrix element row ${row + 1}, column ${col + 1}`);
    input.placeholder = '0';
    input.step = '0.01';
    
    // Add input validation
    input.addEventListener('input', (e) => this.validateNumericInput(e));
    input.addEventListener('keydown', (e) => this.handleMatrixNavigation(e, row, col));
    
    return input;
  }

  /**
   * Create equation row with multiple inputs
   */
  createEquationRow(equationIndex, totalUnknowns) {
    const row = document.createElement('div');
    row.className = 'equation-row';
    
    // Create coefficient inputs
    for (let i = 0; i < totalUnknowns; i++) {
      const coeffInput = document.createElement('input');
      coeffInput.type = 'number';
      coeffInput.className = 'equation-input coefficient';
      coeffInput.id = `eq-${equationIndex}-coeff-${i}`;
      coeffInput.setAttribute('aria-label', `Equation ${equationIndex + 1}, coefficient for variable ${String.fromCharCode(120 + i)}`);
      coeffInput.placeholder = '0';
      coeffInput.step = '0.01';
      
      const variable = document.createElement('span');
      variable.className = 'variable-label';
      variable.textContent = String.fromCharCode(120 + i); // x, y, z, w
      
      row.appendChild(coeffInput);
      row.appendChild(variable);
      
      if (i < totalUnknowns - 1) {
        const plus = document.createElement('span');
        plus.className = 'operator';
        plus.textContent = ' + ';
        row.appendChild(plus);
      }
    }
    
    // Add equals sign and result input
    const equals = document.createElement('span');
    equals.className = 'operator equals';
    equals.textContent = ' = ';
    row.appendChild(equals);
    
    const resultInput = document.createElement('input');
    resultInput.type = 'number';
    resultInput.className = 'equation-input result';
    resultInput.id = `eq-${equationIndex}-result`;
    resultInput.setAttribute('aria-label', `Equation ${equationIndex + 1} result`);
    resultInput.placeholder = '0';
    resultInput.step = '0.01';
    
    row.appendChild(resultInput);
    
    return row;
  }

  /**
   * Handle matrix keyboard navigation
   */
  handleMatrixNavigation(e, row, col) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    
    e.preventDefault();
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    
    let newRow = row;
    let newCol = col;
    
    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(rows - 1, row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(cols - 1, col + 1);
        break;
    }
    
    const nextInput = document.getElementById(`matrix-${newRow}-${newCol}`);
    if (nextInput) nextInput.focus();
  }

  /**
   * Validate numeric input
   */
  validateNumericInput(e) {
    const value = e.target.value;
    
    // Allow empty, numbers, decimal points, and negative signs
    if (value && !/^-?\d*\.?\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
      this.showValidationError(e.target, 'Please enter a valid number');
    } else {
      this.clearValidationError(e.target);
    }
  }

  /**
   * Show validation error
   */
  showValidationError(input, message) {
    input.classList.add('error');
    input.title = message;
  }

  /**
   * Clear validation error
   */
  clearValidationError(input) {
    input.classList.remove('error');
    input.title = '';
  }

  /**
   * Calculate matrix operations
   */
  calculateMatrix() {
    try {
      const matrixData = this.getMatrixData();
      
      if (!this.validateMatrixData(matrixData)) {
        return;
      }

      // Show loading state
      this.setLoadingState(true, 'matrix');
      
      // Perform calculation using MatrixCalculator
      const calculator = new MatrixCalculator();
      const results = calculator.calculateAllOperations(matrixData);
      
      this.displayMatrixResults(results);
      
    } catch (error) {
      this.displayError('matrix', error.message);
    } finally {
      this.setLoadingState(false, 'matrix');
    }
  }

  /**
   * Solve equations
   */
  solveEquations() {
    try {
      const equationData = this.getEquationData();
      
      if (!this.validateEquationData(equationData)) {
        return;
      }

      // Show loading state
      this.setLoadingState(true, 'equation');
      
      // Perform calculation using EquationSolver
      const solver = new EquationSolver();
      const solution = solver.solve(equationData);
      
      this.displayEquationResults(solution);
      
    } catch (error) {
      this.displayError('equation', error.message);
    } finally {
      this.setLoadingState(false, 'equation');
    }
  }

  /**
   * Get matrix data from inputs
   */
  getMatrixData() {
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-${i}-${j}`);
        const value = parseFloat(input.value) || 0;
        row.push(value);
      }
      matrix.push(row);
    }
    
    return { matrix, rows, cols };
  }

  /**
   * Get equation data from inputs
   */
  getEquationData() {
    const unknowns = this.currentEquationSize;
    const equations = [];
    
    for (let i = 0; i < unknowns; i++) {
      const coefficients = [];
      
      for (let j = 0; j < unknowns; j++) {
        const input = document.getElementById(`eq-${i}-coeff-${j}`);
        const value = parseFloat(input.value) || 0;
        coefficients.push(value);
      }
      
      const resultInput = document.getElementById(`eq-${i}-result`);
      const result = parseFloat(resultInput.value) || 0;
      
      equations.push({ coefficients, result });
    }
    
    return { equations, unknowns };
  }

  /**
   * Validate matrix data
   */
  validateMatrixData(data) {
    if (!data.matrix || data.matrix.length === 0) {
      this.displayError('matrix', 'Please enter matrix values');
      return false;
    }
    
    return true;
  }

  /**
   * Validate equation data
   */
  validateEquationData(data) {
    if (!data.equations || data.equations.length === 0) {
      this.displayError('equation', 'Please enter equation values');
      return false;
    }
    
    // Check for valid coefficients
    for (const eq of data.equations) {
      if (eq.coefficients.every(c => c === 0)) {
        this.displayError('equation', 'Each equation must have at least one non-zero coefficient');
        return false;
      }
    }
    
    return true;
  }

  /**
   * Display matrix calculation results
   */
  displayMatrixResults(results) {
    // Show the equals section with matrix result display
    const equalsSection = document.getElementById('matrix-equals-section');
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if (!equalsSection || !resultGrid) return;
    
    // Get current matrix size
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    
    // Clear previous results
    resultGrid.innerHTML = '';
    resultGrid.className = `matrix-result-grid size-${rows}x${cols}`;
    
    // Create result display based on the type of results
    let primaryResult = null;
    let resultType = 'matrix';
    
    // Determine primary result to display (prioritize matrix operations)
    if (results.transpose && Array.isArray(results.transpose)) {
      primaryResult = results.transpose;
      resultType = 'transpose';
    } else if (results.inverse && Array.isArray(results.inverse)) {
      primaryResult = results.inverse;
      resultType = 'inverse';
    } else if (results.determinant !== undefined && !isNaN(results.determinant)) {
      primaryResult = results.determinant;
      resultType = 'determinant';
    } else if (results.trace !== undefined && !isNaN(results.trace)) {
      primaryResult = results.trace;
      resultType = 'trace';
    } else if (results.vectorMagnitude !== undefined && !isNaN(results.vectorMagnitude)) {
      primaryResult = results.vectorMagnitude;
      resultType = 'vectorMagnitude';
    } else if (results.normalizedVector && Array.isArray(results.normalizedVector)) {
      primaryResult = results.normalizedVector;
      resultType = 'normalizedVector';
    }
    
    if (primaryResult !== null) {
      this.displayPrimaryResult(primaryResult, resultType, rows, cols);
      
      // Show the equals section with animation
      equalsSection.style.display = 'flex';
      setTimeout(() => {
        equalsSection.classList.add('show');
      }, 100);
    }
    
    // Update detailed results section
    const resultsSection = document.getElementById('matrix-results');
    const resultsContent = document.getElementById('matrix-result-content');
    
    let html = '<div class="calculation-results">';
    
    Object.entries(results).forEach(([operation, result]) => {
      html += `
        <div class="result-item">
          <h4 class="result-title">${this.formatOperationName(operation)}</h4>
          <div class="result-value">${this.formatMatrixResult(result)}</div>
        </div>
      `;
    });
    
    html += '</div>';
    
    resultsContent.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Accessibility announcement
    this.announceToScreenReader('Matrix calculations completed. Results are now displayed.');
  }

  /**
   * Display primary result in matrix format
   */
  displayPrimaryResult(result, type, rows, cols) {
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if ((type === 'matrix' || type === 'transpose' || type === 'inverse') && Array.isArray(result)) {
      // Display matrix result
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
          const resultCell = this.createResultCell(result[i][j], type, i * result[i].length + j);
          resultGrid.appendChild(resultCell);
        }
      }
    } else if (type === 'normalizedVector' && Array.isArray(result)) {
      // Display vector result (for normalized vectors)
      if (rows === 1) {
        // Row vector
        for (let j = 0; j < result.length; j++) {
          const resultCell = this.createResultCell(result[j], type, j);
          resultGrid.appendChild(resultCell);
        }
      } else {
        // Column vector
        for (let i = 0; i < result.length; i++) {
          const resultCell = this.createResultCell(result[i], type, i);
          resultGrid.appendChild(resultCell);
        }
      }
    } else if (['determinant', 'trace', 'vectorMagnitude', 'frobeniusNorm'].includes(type)) {
      // Display single value result (determinant, trace, etc.)
      // Create a single cell for scalar results
      const resultCell = this.createResultCell(result, type, 0);
      resultCell.style.gridColumn = '1 / -1';
      resultCell.style.gridRow = '1 / -1';
      resultCell.style.width = '120px';
      resultCell.style.height = '80px';
      resultCell.style.fontSize = 'var(--text-xl)';
      
      // Add operation label
      const label = document.createElement('div');
      label.className = 'operation-label';
      
      const labelText = {
        'determinant': 'det(A)',
        'trace': 'tr(A)',
        'vectorMagnitude': '|v|',
        'frobeniusNorm': '||A||F'
      };
      
      label.textContent = labelText[type] || type;
      resultCell.appendChild(label);
      
      resultGrid.appendChild(resultCell);
    }
  }

  /**
   * Create result cell element
   */
  createResultCell(value, type, index) {
    const cell = document.createElement('div');
    cell.className = `result-value ${type}`;
    
    // Format the value
    const formattedValue = typeof value === 'number' ? 
      (Math.abs(value) < 0.0001 ? '0' : value.toFixed(3)) : 
      String(value);
    
    cell.textContent = formattedValue;
    cell.setAttribute('aria-label', `Result: ${formattedValue}`);
    
    // Add animation delay based on index
    cell.style.animationDelay = `${index * 0.1}s`;
    
    return cell;
  }

  /**
   * Display equation solving results
   */
  displayEquationResults(solution) {
    const resultsSection = document.getElementById('equation-results');
    const resultsContent = document.getElementById('equation-result-content');
    
    let html = '<div class="equation-solution">';
    
    if (solution.hasUniqueSolution) {
      html += '<h4 class="solution-title">Unique Solution Found:</h4>';
      solution.variables.forEach((value, index) => {
        const variable = String.fromCharCode(120 + index);
        html += `<div class="variable-result">${variable} = ${value.toFixed(4)}</div>`;
      });
    } else {
      html += '<h4 class="solution-title">No Unique Solution</h4>';
      html += `<p class="solution-info">${solution.message}</p>`;
    }
    
    html += '</div>';
    
    resultsContent.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Accessibility announcement
    this.announceToScreenReader('Equation solving completed. Solution is now displayed.');
  }

  /**
   * Display error messages
   */
  displayError(type, message) {
    const resultsSection = document.getElementById(`${type}-results`);
    const resultsContent = document.getElementById(`${type}-result-content`);
    
    resultsContent.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
      </div>
    `;
    
    resultsSection.style.display = 'block';
    
    // Accessibility announcement
    this.announceToScreenReader(`Error: ${message}`);
  }

  /**
   * Set loading state
   */
  setLoadingState(loading, type) {
    const section = document.getElementById(`${type}-section`);
    
    if (loading) {
      section.classList.add('loading');
    } else {
      section.classList.remove('loading');
    }
  }

  /**
   * Clear matrix inputs and results
   */
  clearMatrix() {
    const inputs = document.querySelectorAll('.matrix-input');
    inputs.forEach(input => {
      input.value = '';
      this.clearValidationError(input);
    });
    
    // Hide results sections
    const resultsSection = document.getElementById('matrix-results');
    resultsSection.style.display = 'none';
    
    // Hide equals section and clear result grid
    const equalsSection = document.getElementById('matrix-equals-section');
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if (equalsSection) {
      equalsSection.classList.remove('show');
      setTimeout(() => {
        equalsSection.style.display = 'none';
      }, 300);
    }
    
    if (resultGrid) {
      resultGrid.innerHTML = '';
    }
    
    // Focus first input
    const firstInput = inputs[0];
    if (firstInput) firstInput.focus();
    
    this.announceToScreenReader('Matrix inputs cleared');
  }

  /**
   * Clear equation inputs and results
   */
  clearEquations() {
    const inputs = document.querySelectorAll('.equation-input');
    inputs.forEach(input => {
      input.value = '';
      this.clearValidationError(input);
    });
    
    const resultsSection = document.getElementById('equation-results');
    resultsSection.style.display = 'none';
    
    // Focus first input
    const firstInput = inputs[0];
    if (firstInput) firstInput.focus();
    
    this.announceToScreenReader('Equation inputs cleared');
  }

  /**
   * Update active button state
   */
  updateActiveButton(selector, activeSelector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(activeSelector);
    if (activeButton) activeButton.classList.add('active');
  }

  /**
   * Format operation name for display
   */
  formatOperationName(operation) {
    const names = {
      determinant: 'Determinant',
      transpose: 'Transpose',
      inverse: 'Inverse Matrix',
      trace: 'Trace',
      rank: 'Rank',
      rowEchelonForm: 'Row Echelon Form',
      vectorMagnitude: 'Vector Magnitude',
      normalizedVector: 'Normalized Vector',
      frobeniusNorm: 'Frobenius Norm',
      dotProduct: 'Dot Product',
      crossProduct: 'Cross Product'
    };
    return names[operation] || operation.charAt(0).toUpperCase() + operation.slice(1);
  }

  /**
   * Format matrix result for display
   */
  formatMatrixResult(result) {
    if (typeof result === 'number') {
      return result.toFixed(4);
    }
    
    if (Array.isArray(result)) {
      return this.formatMatrix(result);
    }
    
    return String(result);
  }

  /**
   * Format matrix as HTML table
   */
  formatMatrix(matrix) {
    let html = '<table class="matrix-display">';
    
    matrix.forEach(row => {
      html += '<tr>';
      row.forEach(cell => {
        html += `<td>${Number(cell).toFixed(4)}</td>`;
      });
      html += '</tr>';
    });
    
    html += '</table>';
    return html;
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Add ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    
    document.body.appendChild(liveRegion);
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  /**
   * Handle tab navigation improvements
   */
  handleTabNavigation(e) {
    // Custom tab order logic can be implemented here
    // For now, let browser handle default tab order
  }
}

// Initialize the UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.matrixCalculatorUI = new MatrixCalculatorUI();
});