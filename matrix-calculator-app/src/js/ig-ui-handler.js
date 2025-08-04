/**
 * IG-Style Matrix Calculator UI Handler
 * Instagram-inspired interface for student engagement
 */

class IGMatrixCalculatorUI {
  constructor() {
    this.currentMatrixSize = null;
    this.currentEquationSize = null;
    this.currentSection = 'home';
    this.matrixData = [];
    this.equationData = [];
    this.matrixMode = 'single'; // 'single' or 'dual'
    this.currentOperation = 'add'; // for dual matrix operations
    
    this.init();
  }

  /**
   * Initialize the IG-style application
   */
  init() {
    this.bindNavigationEvents();
    this.bindMatrixEvents();
    this.bindEquationEvents();
    this.bindCalculatorActions();
    this.bindQuickActions();
    this.bindMatrixModeEvents();
    this.bindOperationEvents();
    this.setupAccessibility();
    
    // Show home section by default
    this.showSection('home');
    
    console.log('IG-Style Matrix Calculator UI initialized');
  }

  /**
   * Navigation event handlers
   */
  bindNavigationEvents() {
    // Desktop navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.showSection(section);
      });
    });

    // Mobile bottom navigation
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.showSection(section);
      });
    });
  }

  /**
   * Show specific section with IG-style transitions
   */
  showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.feed-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Remove active state from navigation
    const allNavItems = document.querySelectorAll('.nav-item, .bottom-nav-item');
    allNavItems.forEach(item => {
      item.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.classList.add('fade-in');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        targetSection.classList.remove('fade-in');
      }, 600);
    }

    // Add active state to navigation
    const activeNavItems = document.querySelectorAll(`[data-section="${sectionName}"]`);
    activeNavItems.forEach(item => {
      item.classList.add('active');
    });

    this.currentSection = sectionName;
  }

  /**
   * Matrix size selection events
   */
  bindMatrixEvents() {
    const sizeTiles = document.querySelectorAll('.size-tile');
    sizeTiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        const size = e.currentTarget.dataset.size;
        this.selectMatrixSize(size);
      });
    });
  }

  /**
   * Equation size selection events  
   */
  bindEquationEvents() {
    const equationTiles = document.querySelectorAll('.equation-tile');
    equationTiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        const unknowns = parseInt(e.currentTarget.dataset.unknowns);
        this.selectEquationSize(unknowns);
      });
    });
  }

  /**
   * Calculator action events
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
   * Matrix mode toggle events
   */
  bindMatrixModeEvents() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchMatrixMode(mode);
      });
    });
  }

  /**
   * Operation selection events
   */
  bindOperationEvents() {
    const operationBtns = document.querySelectorAll('.operation-btn');
    operationBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const operation = e.currentTarget.dataset.operation;
        this.selectOperation(operation);
      });
    });
  }

  /**
   * Switch between single and dual matrix modes
   */
  switchMatrixMode(mode) {
    this.matrixMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Show/hide appropriate interfaces
    const singleMode = document.getElementById('single-matrix-mode');
    const dualMode = document.getElementById('dual-matrix-mode');
    const operationSelector = document.getElementById('operation-selector');
    
    if (mode === 'single') {
      singleMode.style.display = 'block';
      dualMode.style.display = 'none';
      operationSelector.style.display = 'none';
    } else {
      singleMode.style.display = 'none';
      dualMode.style.display = 'flex';
      operationSelector.style.display = 'grid';
    }
    
    // Regenerate grids if matrix size is selected
    if (this.currentMatrixSize) {
      this.generateMatrixGrid(
        ...this.currentMatrixSize.split('x').map(Number)
      );
    }
  }

  /**
   * Select operation for dual matrix mode
   */
  selectOperation(operation) {
    this.currentOperation = operation;
    
    // Update button states
    document.querySelectorAll('.operation-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-operation="${operation}"]`).classList.add('active');
    
    // Update operation symbol
    const operationSymbol = document.getElementById('operation-symbol');
    const symbols = {
      add: '+',
      subtract: '-',
      dot: '·',
      cross: '×'
    };
    operationSymbol.textContent = symbols[operation] || '+';
  }

  /**
   * Quick action events from home screen
   */
  bindQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(action);
      });
    });
  }

  /**
   * Handle quick actions from home screen
   */
  handleQuickAction(action) {
    switch (action) {
      case 'matrix-1x2':
        this.showSection('matrix');
        setTimeout(() => this.selectMatrixSize('1x2'), 300);
        break;
      case 'matrix-1x3':
        this.showSection('matrix');
        setTimeout(() => this.selectMatrixSize('1x3'), 300);
        break;
      case 'matrix-2x2':
        this.showSection('matrix');
        setTimeout(() => this.selectMatrixSize('2x2'), 300);
        break;
      case 'matrix-3x3':
        this.showSection('matrix');
        setTimeout(() => this.selectMatrixSize('3x3'), 300);
        break;
      case 'equations-2':
        this.showSection('equations');
        setTimeout(() => this.selectEquationSize(2), 300);
        break;
      case 'equations-3':
        this.showSection('equations');
        setTimeout(() => this.selectEquationSize(3), 300);
        break;
    }
  }

  /**
   * Select matrix size and generate input grid
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
    
    // Generate matrix grid
    this.generateMatrixGrid(rows, cols);
    
    // Scroll to input area
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  /**
   * Select equation size and generate input fields
   */
  selectEquationSize(unknowns) {
    // Update active state
    this.updateActiveButton('.equation-tile', `[data-unknowns="${unknowns}"]`);
    
    this.currentEquationSize = unknowns;
    
    // Show input container with animation
    const container = document.getElementById('equation-input-container');
    container.style.display = 'block';
    container.classList.add('slide-in');
    
    // Generate equation grid
    this.generateEquationGrid(unknowns);
    
    // Scroll to input area
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  /**
   * Generate matrix input grid with IG styling
   */
  generateMatrixGrid(rows, cols) {
    if (this.matrixMode === 'single') {
      this.generateSingleMatrixGrid(rows, cols);
    } else {
      this.generateDualMatrixGrids(rows, cols);
    }

    // Hide result section initially
    const resultContainer = document.getElementById('matrix-equals-section');
    if (resultContainer) {
      resultContainer.style.display = 'none';
      resultContainer.classList.remove('show');
    }
  }

  /**
   * Generate single matrix grid
   */
  generateSingleMatrixGrid(rows, cols) {
    const grid = document.getElementById('matrix-grid');
    grid.innerHTML = '';
    grid.className = `matrix-grid size-${rows}x${cols}`;
    
    // Create matrix inputs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = this.createMatrixInput(i, j);
        grid.appendChild(input);
      }
    }

    // Focus first input
    const firstInput = grid.querySelector('.matrix-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 200);
    }
  }

  /**
   * Generate dual matrix grids (A and B)
   */
  generateDualMatrixGrids(rows, cols) {
    // Matrix A grid
    const gridA = document.getElementById('matrix-a-grid');
    gridA.innerHTML = '';
    gridA.className = `matrix-grid size-${rows}x${cols}`;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = this.createMatrixInput(i, j, 'a');
        gridA.appendChild(input);
      }
    }

    // Matrix B grid
    const gridB = document.getElementById('matrix-b-grid');
    gridB.innerHTML = '';
    gridB.className = `matrix-grid size-${rows}x${cols}`;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const input = this.createMatrixInput(i, j, 'b');
        gridB.appendChild(input);
      }
    }

    // Focus first input in matrix A
    const firstInput = gridA.querySelector('.matrix-input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 200);
    }
  }

  /**
   * Generate equation input grid
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
      setTimeout(() => firstInput.focus(), 200);
    }
  }

  /**
   * Create matrix input element with IG styling
   */
  createMatrixInput(row, col, matrix = '') {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'matrix-input';
    
    // Set ID based on matrix type
    if (matrix) {
      input.id = `matrix-${matrix}-${row}-${col}`;
      input.setAttribute('aria-label', `Matrix ${matrix.toUpperCase()} element row ${row + 1}, column ${col + 1}`);
    } else {
      input.id = `matrix-${row}-${col}`;
      input.setAttribute('aria-label', `Matrix element row ${row + 1}, column ${col + 1}`);
    }
    
    input.placeholder = '0';
    input.step = '0.01';
    
    // Add input validation and navigation
    input.addEventListener('input', (e) => this.validateNumericInput(e));
    input.addEventListener('keydown', (e) => this.handleMatrixNavigation(e, row, col, matrix));
    
    return input;
  }

  /**
   * Create equation row with IG styling
   */
  createEquationRow(equationIndex, totalUnknowns) {
    const row = document.createElement('div');
    row.className = 'equation-row';
    row.style.cssText = `
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3);
      background: var(--ig-gray-50);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-3);
    `;
    
    // Create coefficient inputs
    for (let i = 0; i < totalUnknowns; i++) {
      const coeffInput = document.createElement('input');
      coeffInput.type = 'number';
      coeffInput.className = 'equation-input coefficient';
      coeffInput.id = `eq-${equationIndex}-coeff-${i}`;
      coeffInput.setAttribute('aria-label', `Equation ${equationIndex + 1}, coefficient for variable ${String.fromCharCode(120 + i)}`);
      coeffInput.placeholder = '0';
      coeffInput.step = '0.01';
      
      // Add input validation and formatting
      coeffInput.addEventListener('input', (e) => this.validateNumericInput(e));
      coeffInput.addEventListener('keypress', (e) => this.restrictToNumericInput(e));
      
      coeffInput.style.cssText = `
        width: 80px;
        height: 50px;
        border: 2px solid var(--ig-gray-300);
        border-radius: var(--radius-lg);
        text-align: center;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        background: var(--ig-white);
        font-size: var(--text-base);
        margin: 0 var(--space-1);
      `;
      
      const variable = document.createElement('span');
      variable.className = 'variable-label';
      variable.textContent = String.fromCharCode(120 + i); // x, y, z, w
      variable.style.cssText = `
        font-weight: var(--font-weight-semibold);
        color: var(--primary);
        margin-right: var(--space-2);
        font-size: var(--text-lg);
      `;
      
      row.appendChild(coeffInput);
      row.appendChild(variable);
      
      if (i < totalUnknowns - 1) {
        const plus = document.createElement('span');
        plus.className = 'operator';
        plus.textContent = ' + ';
        plus.style.cssText = `
          color: var(--ig-gray-600);
          font-weight: var(--font-weight-medium);
          margin: 0 var(--space-1);
        `;
        row.appendChild(plus);
      }
    }
    
    // Add equals sign and result input
    const equals = document.createElement('span');
    equals.textContent = ' = ';
    equals.style.cssText = `
      color: var(--ig-gray-600);
      font-weight: var(--font-weight-bold);
      margin: 0 var(--space-2);
      font-size: var(--text-lg);
    `;
    
    const resultInput = document.createElement('input');
    resultInput.type = 'number';
    resultInput.className = 'equation-input result';
    resultInput.id = `eq-${equationIndex}-result`;
    resultInput.setAttribute('aria-label', `Equation ${equationIndex + 1} result`);
    resultInput.placeholder = '0';
    resultInput.step = '0.01';
    
    // Add input validation and formatting
    resultInput.addEventListener('input', (e) => this.validateNumericInput(e));
    resultInput.addEventListener('keypress', (e) => this.restrictToNumericInput(e));
    
    resultInput.style.cssText = `
      width: 80px;
      height: 50px;
      border: 2px solid var(--ig-gray-300);
      border-radius: var(--radius-lg);
      text-align: center;
      font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
      background: var(--ig-white);
      font-size: var(--text-base);
    `;
    
    row.appendChild(equals);
    row.appendChild(resultInput);
    
    return row;
  }

  /**
   * Calculate matrix operations
   */
  async calculateMatrix() {
    try {
      let results;
      
      if (this.matrixMode === 'single') {
        const matrixData = this.getMatrixData();
        if (!this.validateMatrixData(matrixData)) {
          return;
        }
        
        const calculator = new MatrixCalculator();
        results = calculator.calculateAllOperations(matrixData);
      } else {
        const dualMatrixData = this.getDualMatrixData();
        if (!this.validateDualMatrixData(dualMatrixData)) {
          return;
        }
        
        const enhancedCalculator = new EnhancedMatrixCalculator();
        results = this.calculateDualMatrixOperation(enhancedCalculator, dualMatrixData);
      }

      // Show loading state
      const calculateBtn = document.getElementById('calculate-matrix');
      const originalText = calculateBtn.innerHTML;
      calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Calculating...</span>';
      calculateBtn.disabled = true;

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      this.displayMatrixResults(results);
      this.addToHistory('matrix', this.matrixMode === 'single' ? this.getMatrixData() : this.getDualMatrixData(), results);

      // Reset button
      calculateBtn.innerHTML = originalText;
      calculateBtn.disabled = false;

    } catch (error) {
      this.displayError('matrix', error.message);
      console.error('Matrix calculation error:', error);
      
      // Reset button on error
      const calculateBtn = document.getElementById('calculate-matrix');
      if (calculateBtn) {
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> <span>Calculate</span>';
        calculateBtn.disabled = false;
      }
    }
  }

  /**
   * Solve equation system
   */
  async solveEquations() {
    try {
      const equationData = this.getEquationData();
      
      if (!this.validateEquationData(equationData)) {
        return;
      }

      // Show loading state
      const solveBtn = document.getElementById('solve-equation');
      const originalText = solveBtn.innerHTML;
      solveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Solving...</span>';
      solveBtn.disabled = true;

      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const solver = new EquationSolver();
      const solution = solver.solveLinearSystem(equationData.equations);

      this.displayEquationResults(solution);
      this.addToHistory('equation', equationData, solution);

      // Reset button
      solveBtn.innerHTML = originalText;
      solveBtn.disabled = false;

    } catch (error) {
      this.displayError('equation', error.message);
      console.error('Equation solving error:', error);
    }
  }

  /**
   * Display matrix results with IG-style animation
   */
  displayMatrixResults(results) {
    // Show matrix result in equation format
    const resultContainer = document.getElementById('matrix-equals-section');
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if (!resultContainer || !resultGrid) return;
    
    // Get current matrix size
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    
    // Clear previous results
    resultGrid.innerHTML = '';
    resultGrid.className = `matrix-result-grid size-${rows}x${cols}`;
    
    // Determine primary result to display
    let primaryResult = null;
    let resultType = 'matrix';
    
    if (results.determinant !== undefined && !isNaN(results.determinant)) {
      primaryResult = results.determinant;
      resultType = 'determinant';
    } else if (results.trace !== undefined && !isNaN(results.trace)) {
      primaryResult = results.trace;
      resultType = 'trace';
    } else if (results.transpose && Array.isArray(results.transpose)) {
      primaryResult = results.transpose;
      resultType = 'matrix';
    } else if (results.inverse && Array.isArray(results.inverse)) {
      primaryResult = results.inverse;
      resultType = 'matrix';
    }
    
    if (primaryResult !== null) {
      this.displayPrimaryResult(primaryResult, resultType, rows, cols);
      
      // Show the result container with animation
      resultContainer.style.display = 'flex';
      setTimeout(() => {
        resultContainer.classList.add('show');
      }, 100);
    }
    
    // Update detailed results story card
    const resultsCard = document.getElementById('matrix-results');
    const resultsContent = document.getElementById('matrix-result-content');
    
    let html = '<div class="results-grid">';
    
    Object.entries(results).forEach(([operation, result]) => {
      html += `
        <div class="result-card">
          <div class="result-header">
            <h4>${this.formatOperationName(operation)}</h4>
          </div>
          <div class="result-body">
            ${this.formatMatrixResult(result)}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    
    resultsContent.innerHTML = html;
    resultsCard.style.display = 'block';
    resultsCard.classList.add('fade-in');
    
    // Scroll to results
    setTimeout(() => {
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  /**
   * Display primary result in matrix format
   */
  displayPrimaryResult(result, type, rows, cols) {
    const resultGrid = document.getElementById('matrix-result-grid');
    
    if (type === 'matrix' && Array.isArray(result)) {
      // Display matrix result
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
          const resultCell = this.createResultCell(result[i][j], type, i * result[i].length + j);
          resultGrid.appendChild(resultCell);
        }
      }
    } else if (type === 'determinant' || type === 'trace') {
      // Display single value result
      const resultCell = this.createResultCell(result, type, 0);
      resultCell.style.gridColumn = '1 / -1';
      resultCell.style.gridRow = '1 / -1';
      resultCell.style.width = '80px';
      resultCell.style.height = '60px';
      resultCell.style.fontSize = 'var(--text-lg)';
      
      resultGrid.appendChild(resultCell);
    }
  }

  /**
   * Create result cell with IG styling
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
   * Display equation results with IG styling
   */
  displayEquationResults(solution) {
    const resultsCard = document.getElementById('equation-results');
    const resultsContent = document.getElementById('equation-result-content');
    
    let html = '<div class="solution-grid">';
    
    if (solution.hasUniqueSolution) {
      html += '<div class="solution-header"><h4>✅ Solution Found</h4></div>';
      html += '<div class="variables-grid">';
      
      solution.variables.forEach((value, index) => {
        const variable = String.fromCharCode(120 + index);
        html += `
          <div class="variable-result">
            <span class="variable-name">${variable}</span>
            <span class="variable-equals">=</span>
            <span class="variable-value">${value.toFixed(4)}</span>
          </div>
        `;
      });
      
      html += '</div>';
    } else {
      html += '<div class="solution-header error"><h4>❌ No Unique Solution</h4></div>';
      html += `<p class="solution-message">${solution.message}</p>`;
    }
    
    html += '</div>';
    
    resultsContent.innerHTML = html;
    resultsCard.style.display = 'block';
    resultsCard.classList.add('fade-in');
    
    // Scroll to results
    setTimeout(() => {
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  /**
   * Clear matrix inputs and results
   */
  clearMatrix() {
    const inputs = document.querySelectorAll('.matrix-input');
    inputs.forEach(input => {
      input.value = '';
      input.style.borderColor = 'var(--ig-gray-300)';
    });
    
    // Hide results sections
    const resultsCard = document.getElementById('matrix-results');
    const resultContainer = document.getElementById('matrix-equals-section');
    
    resultsCard.style.display = 'none';
    resultContainer.style.display = 'none';
    resultContainer.classList.remove('show');
    
    // Focus first input
    const firstInput = inputs[0];
    if (firstInput) firstInput.focus();
  }

  /**
   * Clear equation inputs and results
   */
  clearEquations() {
    const inputs = document.querySelectorAll('.equation-input');
    inputs.forEach(input => {
      input.value = '';
      input.style.borderColor = 'var(--ig-gray-300)';
    });
    
    const resultsCard = document.getElementById('equation-results');
    resultsCard.style.display = 'none';
    
    // Focus first input
    const firstInput = inputs[0];
    if (firstInput) firstInput.focus();
  }

  /**
   * Utility functions
   */
  updateActiveButton(selector, activeSelector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(activeSelector);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }

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
   * Get dual matrix data (Matrix A and Matrix B)
   */
  getDualMatrixData() {
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    const matrixA = [];
    const matrixB = [];
    
    // Get Matrix A
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-a-${i}-${j}`);
        const value = parseFloat(input.value) || 0;
        row.push(value);
      }
      matrixA.push(row);
    }
    
    // Get Matrix B
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-b-${i}-${j}`);
        const value = parseFloat(input.value) || 0;
        row.push(value);
      }
      matrixB.push(row);
    }
    
    return { matrixA, matrixB, rows, cols, operation: this.currentOperation };
  }

  /**
   * Calculate dual matrix operations
   */
  calculateDualMatrixOperation(calculator, data) {
    const { matrixA, matrixB, operation } = data;
    
    switch (operation) {
      case 'add':
        return calculator.addMatrices(matrixA, matrixB);
      case 'subtract':
        return calculator.subtractMatrices(matrixA, matrixB);
      case 'dot':
        return calculator.dotProductVectors(matrixA, matrixB);
      case 'cross':
        return calculator.crossProductVectors(matrixA, matrixB);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  /**
   * Validate dual matrix data
   */
  validateDualMatrixData(data) {
    const { matrixA, matrixB, operation } = data;
    
    // Check if matrices exist
    if (!matrixA || !matrixB || !matrixA.length || !matrixB.length) {
      this.displayError('matrix', 'Please fill in both matrices');
      return false;
    }
    
    // Check if matrices have same dimensions for addition/subtraction
    if ((operation === 'add' || operation === 'subtract')) {
      if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        this.displayError('matrix', 'Matrices must have the same dimensions for addition/subtraction');
        return false;
      }
    }
    
    // Check if matrices can be treated as vectors for dot/cross product
    if ((operation === 'dot' || operation === 'cross')) {
      const isVectorA = matrixA.length === 1 || matrixA[0].length === 1;
      const isVectorB = matrixB.length === 1 || matrixB[0].length === 1;
      
      if (!isVectorA || !isVectorB) {
        this.displayError('matrix', 'Dot and cross products require vector inputs (1×n or n×1 matrices)');
        return false;
      }
      
      if (operation === 'cross') {
        const vectorA = matrixA.length === 1 ? matrixA[0] : matrixA.map(row => row[0]);
        const vectorB = matrixB.length === 1 ? matrixB[0] : matrixB.map(row => row[0]);
        
        if (vectorA.length !== 3 || vectorB.length !== 3) {
          this.displayError('matrix', 'Cross product requires 3D vectors');
          return false;
        }
      }
    }
    
    return true;
  }

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

  validateMatrixData(data) {
    // Basic validation - ensure matrix has values
    return data.matrix && data.matrix.length > 0;
  }

  validateEquationData(data) {
    // Basic validation - ensure equations exist
    return data.equations && data.equations.length > 0;
  }

  validateNumericInput(event) {
    // Allow numeric input validation
    const value = event.target.value;
    if (value && isNaN(parseFloat(value))) {
      event.target.style.borderColor = 'var(--error)';
    } else {
      event.target.style.borderColor = 'var(--ig-gray-300)';
    }
  }

  handleMatrixNavigation(event, row, col) {
    // Handle keyboard navigation between matrix inputs
    const [rows, cols] = this.currentMatrixSize.split('x').map(Number);
    
    if (event.key === 'ArrowRight' && col < cols - 1) {
      event.preventDefault();
      document.getElementById(`matrix-${row}-${col + 1}`).focus();
    } else if (event.key === 'ArrowLeft' && col > 0) {
      event.preventDefault();
      document.getElementById(`matrix-${row}-${col - 1}`).focus();
    } else if (event.key === 'ArrowDown' && row < rows - 1) {
      event.preventDefault();
      document.getElementById(`matrix-${row + 1}-${col}`).focus();
    } else if (event.key === 'ArrowUp' && row > 0) {
      event.preventDefault();
      document.getElementById(`matrix-${row - 1}-${col}`).focus();
    }
  }

  formatOperationName(operation) {
    const names = {
      determinant: 'Determinant',
      transpose: 'Transpose',
      trace: 'Trace',
      inverse: 'Inverse',
      rank: 'Rank',
      dotProduct: 'Dot Product',
      crossProduct: 'Cross Product',
      vectorMagnitude: 'Vector Magnitude',
      frobeniusNorm: 'Frobenius Norm'
    };
    return names[operation] || operation;
  }

  formatMatrixResult(result) {
    if (typeof result === 'number') {
      return Math.abs(result) < 0.0001 ? '0' : result.toFixed(4);
    } else if (Array.isArray(result)) {
      return result.map(row => 
        Array.isArray(row) ? 
        `[${row.map(val => (Math.abs(val) < 0.0001 ? '0' : val.toFixed(3))).join(', ')}]` :
        (Math.abs(row) < 0.0001 ? '0' : row.toFixed(3))
      ).join('<br>');
    } else {
      return String(result);
    }
  }

  displayError(type, message) {
    // Simple error display - can be enhanced with IG-style notifications
    alert(`${type} error: ${message}`);
  }

  addToHistory(type, data, results) {
    // Store calculation in local storage for history
    const history = JSON.parse(localStorage.getItem('matrixCalcHistory') || '[]');
    const entry = {
      type,
      data,
      results,
      timestamp: new Date().toISOString()
    };
    
    history.unshift(entry);
    if (history.length > 50) history.pop(); // Keep last 50 entries
    
    localStorage.setItem('matrixCalcHistory', JSON.stringify(history));
  }

  /**
   * Validate numeric input and handle zeros properly
   */
  validateNumericInput(event) {
    const input = event.target;
    const value = input.value;
    
    // Allow empty input, numbers, decimal points, and negative signs
    if (value === '' || value === '-' || value === '.' || /^-?\d*\.?\d*$/.test(value)) {
      // Remove error styling
      input.style.borderColor = 'var(--ig-gray-300)';
      input.style.backgroundColor = 'var(--ig-white)';
    } else {
      // Show error styling for invalid input
      input.style.borderColor = 'var(--error)';
      input.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
    }
  }

  /**
   * Restrict input to numeric characters only
   */
  restrictToNumericInput(event) {
    const char = String.fromCharCode(event.which);
    const input = event.target;
    const currentValue = input.value;
    
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (event.keyCode === 65 && event.ctrlKey) ||
        (event.keyCode === 67 && event.ctrlKey) ||
        (event.keyCode === 86 && event.ctrlKey) ||
        (event.keyCode === 88 && event.ctrlKey)) {
      return;
    }
    
    // Allow only numbers, decimal point, and minus sign
    if (!/[\d\.\-]/.test(char)) {
      event.preventDefault();
      return;
    }
    
    // Prevent multiple decimal points
    if (char === '.' && currentValue.indexOf('.') !== -1) {
      event.preventDefault();
      return;
    }
    
    // Prevent multiple minus signs or minus not at beginning
    if (char === '-' && (currentValue.indexOf('-') !== -1 || input.selectionStart !== 0)) {
      event.preventDefault();
      return;
    }
  }

  /**
   * Handle matrix navigation with arrow keys
   */
  handleMatrixNavigation(event, row, col, matrix = '') {
    const [maxRows, maxCols] = this.currentMatrixSize.split('x').map(Number);
    
    if (event.key === 'ArrowUp' && row > 0) {
      event.preventDefault();
      const targetId = matrix ? `matrix-${matrix}-${row-1}-${col}` : `matrix-${row-1}-${col}`;
      document.getElementById(targetId)?.focus();
    } else if (event.key === 'ArrowDown' && row < maxRows - 1) {
      event.preventDefault();
      const targetId = matrix ? `matrix-${matrix}-${row+1}-${col}` : `matrix-${row+1}-${col}`;
      document.getElementById(targetId)?.focus();
    } else if (event.key === 'ArrowLeft' && col > 0) {
      event.preventDefault();
      const targetId = matrix ? `matrix-${matrix}-${row}-${col-1}` : `matrix-${row}-${col-1}`;
      document.getElementById(targetId)?.focus();
    } else if (event.key === 'ArrowRight' && col < maxCols - 1) {
      event.preventDefault();
      const targetId = matrix ? `matrix-${matrix}-${row}-${col+1}` : `matrix-${row}-${col+1}`;
      document.getElementById(targetId)?.focus();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.matrixMode === 'single') {
        this.calculateMatrix();
      } else {
        this.calculateMatrix();
      }
    }
  }

  /**
   * Display error message
   */
  displayError(type, message) {
    // Create or update error message
    let errorContainer = document.getElementById(`${type}-error`);
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.id = `${type}-error`;
      errorContainer.className = 'error-message';
      errorContainer.style.cssText = `
        background: rgba(220, 53, 69, 0.1);
        border: 1px solid var(--error);
        border-radius: var(--radius-lg);
        padding: var(--space-3);
        margin: var(--space-3) 0;
        color: var(--error);
        font-weight: var(--font-weight-medium);
        display: flex;
        align-items: center;
        gap: var(--space-2);
      `;
      
      const icon = document.createElement('i');
      icon.className = 'fas fa-exclamation-triangle';
      errorContainer.appendChild(icon);
      
      const text = document.createElement('span');
      errorContainer.appendChild(text);
      
      // Insert after the appropriate container
      const container = document.getElementById(`${type}-input-container`);
      if (container) {
        container.parentNode.insertBefore(errorContainer, container.nextSibling);
      }
    }
    
    const textElement = errorContainer.querySelector('span');
    textElement.textContent = message;
    errorContainer.style.display = 'flex';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorContainer) {
        errorContainer.style.display = 'none';
      }
    }, 5000);
  }

  setupAccessibility() {
    // Add keyboard shortcuts and accessibility features
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.showSection('home');
            break;
          case '2':
            e.preventDefault();
            this.showSection('matrix');
            break;
          case '3':
            e.preventDefault();
            this.showSection('equations');
            break;
          case '4':
            e.preventDefault();
            this.showSection('history');
            break;
          case '5':
            e.preventDefault();
            this.showSection('tools');
            break;
        }
      }
    });
  }
}

// Initialize the IG-style calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
  window.igMatrixUI = new IGMatrixCalculatorUI();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IGMatrixCalculatorUI;
}
