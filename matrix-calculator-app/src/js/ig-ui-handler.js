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
    
    // Default to dual matrix mode for vector operations (1x2, 1x3)
    if (size === '1x2' || size === '1x3') {
      this.switchMatrixMode('dual');
    } else {
      this.switchMatrixMode('single');
    }
    
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
    input.type = 'text'; // Changed from 'number' to 'text' to allow variables like '3x'
    input.className = 'matrix-input numeric-text';
    
    // Set ID based on matrix type
    if (matrix) {
      input.id = `matrix-${matrix}-${row}-${col}`;
      input.setAttribute('aria-label', `Matrix ${matrix.toUpperCase()} element row ${row + 1}, column ${col + 1}`);
    } else {
      input.id = `matrix-${row}-${col}`;
      input.setAttribute('aria-label', `Matrix element row ${row + 1}, column ${col + 1}`);
    }
    
    input.placeholder = '0';
    input.setAttribute('inputmode', 'decimal'); // Hint for mobile keyboards
    
    // Remove spinner controls and fix styling
    input.style.appearance = 'textfield';
    input.style.webkitAppearance = 'textfield';
    input.style.mozAppearance = 'textfield';
    
    // Add input validation and navigation
    input.addEventListener('input', (e) => {
      e.target.style.backgroundColor = 'var(--surface-black)';
      e.target.style.color = 'var(--text-primary)';
      this.validateAlphanumericInput(e);
    });
    input.addEventListener('keydown', (e) => this.handleMatrixNavigation(e, row, col, matrix));
    input.addEventListener('keypress', (e) => this.restrictToAlphanumericInput(e));
    input.addEventListener('wheel', (e) => e.preventDefault());
    
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
      coeffInput.type = 'text'; // Changed from 'number' to 'text' to allow variables
      coeffInput.className = 'equation-input coefficient numeric-text';
      coeffInput.id = `eq-${equationIndex}-coeff-${i}`;
      coeffInput.setAttribute('aria-label', `Equation ${equationIndex + 1}, coefficient for variable ${String.fromCharCode(120 + i)}`);
      coeffInput.placeholder = '0';
      coeffInput.setAttribute('inputmode', 'decimal'); // Hint for mobile keyboards
      
      // Add input validation and formatting
      coeffInput.addEventListener('input', (e) => this.validateAlphanumericInput(e));
      coeffInput.addEventListener('keypress', (e) => this.restrictToAlphanumericInput(e));
      
      coeffInput.style.cssText = `
        width: 80px;
        height: 50px;
        border: 2px solid var(--glass-border);
        border-radius: var(--radius-lg);
        text-align: center;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        background: var(--surface-black);
        color: var(--text-primary);
        font-size: var(--text-base);
        margin: 0 var(--space-1);
        -moz-appearance: textfield;
      `;
      
      // Remove increment/decrement arrows
      coeffInput.addEventListener('wheel', (e) => e.preventDefault());
      coeffInput.oninput = (e) => {
        e.target.style.backgroundColor = 'var(--surface-black)';
        e.target.style.color = 'var(--text-primary)';
        this.validateNumericInput(e);
      };
      
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
    resultInput.type = 'text'; // Changed from 'number' to 'text' to allow variables
    resultInput.className = 'equation-input result numeric-text';
    resultInput.id = `eq-${equationIndex}-result`;
    resultInput.setAttribute('aria-label', `Equation ${equationIndex + 1} result`);
    resultInput.placeholder = '0';
    resultInput.setAttribute('inputmode', 'decimal'); // Hint for mobile keyboards
    
    // Add input validation and formatting
    resultInput.addEventListener('input', (e) => this.validateAlphanumericInput(e));
    resultInput.addEventListener('keypress', (e) => this.restrictToAlphanumericInput(e));
    
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
   * Display matrix results with enhanced formatting and brackets
   */
  displayMatrixResults(results) {
    // Check if this is a dual matrix operation result
    if (results.operation && results.result !== undefined) {
      this.displayDualMatrixResults(results);
      return;
    }

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
   * Display dual matrix operation results with enhanced symbolic support
   */
  displayDualMatrixResults(operationResult) {
    const enhancedCalculator = new EnhancedMatrixCalculator();
    
    // Handle symbolic vs numeric results differently
    if (operationResult.isSymbolic) {
      // For symbolic results, display the symbolic expression directly
      this.displaySymbolicResult(operationResult);
    } else {
      // For numeric results, use the existing matrix display format
      const resultData = enhancedCalculator.formatMatrixDisplay(
        operationResult.result, 
        `${operationResult.description || 'Result'}`
      );

      // Create the matrix result display container
      const resultContainer = document.getElementById('matrix-equals-section');
      if (!resultContainer) return;

      // Generate the matrix HTML with brackets
      const matrixHTML = enhancedCalculator.generateMatrixHTML(resultData);
      
      // Insert the result into the container
      resultContainer.innerHTML = `
        <div class="equals-symbol">=</div>
        ${matrixHTML}
      `;
      
      // Show the result container with animation
      resultContainer.style.display = 'flex';
      setTimeout(() => {
        resultContainer.classList.add('show');
      }, 100);
    }

    // Update detailed results story card for both types
    this.updateDetailedResults(operationResult);
  }

  /**
   * Display 3D Cross Product Result with clean minimal design
   */
  displaySymbolicResult(operationResult) {
    const resultContainer = document.getElementById('matrix-equals-section');
    if (!resultContainer) return;

    console.log('🔍 DISPLAYING RESULT:', operationResult);

    // Clean minimal 3D Cross Product Result Display
    if (Array.isArray(operationResult.result) && operationResult.result.length === 3) {
      const resultHTML = `
        <div class="cross-product-result-clean">
          <div class="clean-result-layout">
            <div class="equals-symbol-clean">=</div>
            <div class="result-numbers-stack">
              ${operationResult.result.map((value, index) => `
                <div class="result-number-clean">${value}</div>
              `).join('')}
            </div>
          </div>
          <div class="result-label-clean">
            3D Cross Product (A × B) (3×1)
          </div>
        </div>
      `;
      
      resultContainer.innerHTML = resultHTML;
      
    } else {
      // Scalar result with clean styling
      resultContainer.innerHTML = `
        <div class="cross-product-result-clean">
          <div class="clean-result-layout">
            <div class="equals-symbol-clean">=</div>
            <div class="scalar-number-clean">${operationResult.result}</div>
          </div>
          <div class="result-label-clean">
            Scalar Result
          </div>
        </div>
      `;
    }
    
    // Show the result container
    resultContainer.style.display = 'block';
    resultContainer.classList.add('show');
  }

  /**
   * Add copy-to-clipboard functionality to result boxes
   */
  addCopyFunctionality(container) {
    const resultBoxes = container.querySelectorAll('.result-value-box, .scalar-result-box');
    
    resultBoxes.forEach(box => {
      box.addEventListener('click', async () => {
        const value = box.querySelector('.result-number').textContent;
        
        try {
          await navigator.clipboard.writeText(value);
          
          // Visual feedback
          box.classList.add('copied');
          const originalContent = box.innerHTML;
          box.innerHTML = '<span class="copy-feedback">Copied!</span>';
          
          setTimeout(() => {
            box.innerHTML = originalContent;
            box.classList.remove('copied');
          }, 1500);
          
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
      
      // Add hover tooltip
      box.title = 'Click to copy value';
    });
  }

  /**
   * Generate clean, professional result display
   */
  generateCleanResultDisplay(operationResult) {
    const isVector = Array.isArray(operationResult.result);
    const resultType = isVector ? '3D Vector' : '2D Scalar';
    const operationName = operationResult.operation === 'crossProductSymbolic' ? 'Cross Product' : 'Matrix Operation';
    
    return `
      <div class="clean-result-container">
        <div class="result-header">
          <div class="result-icon">×</div>
          <div>
            <h3 class="result-title">${operationName} Result</h3>
            <p class="result-subtitle">${resultType} • Symbolic Calculation</p>
          </div>
        </div>
        
        <div class="result-content">
          ${isVector ? this.generateVectorDisplay(operationResult.result) : this.generateScalarDisplay(operationResult.result)}
        </div>
        
        <div class="result-meta">
          <div class="result-type">
            <span class="type-badge">${resultType}</span>
            <span>Symbolic Expression</span>
          </div>
          <button class="copy-button" onclick="this.copyResult('${isVector ? operationResult.result.join(', ') : operationResult.result}')">
            <i class="fas fa-copy"></i>
            Copy Result
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Generate vector display for 3D results
   */
  generateVectorDisplay(vectorResult) {
    const components = ['i', 'j', 'k'];
    
    return `
      <div class="vector-result">
        <span class="vector-bracket">[</span>
        <div class="vector-components">
          ${vectorResult.map((expr, index) => `
            <div class="vector-component">
              <div class="component-badge">${components[index]}</div>
              <div class="component-value">${this.formatExpression(expr)}</div>
            </div>
          `).join('')}
        </div>
        <span class="vector-bracket">]</span>
      </div>
    `;
  }

  /**
   * Generate scalar display for 2D results
   */
  generateScalarDisplay(scalarResult) {
    return `
      <div class="scalar-result">
        <div class="scalar-value">${this.formatExpression(scalarResult)}</div>
      </div>
    `;
  }

  /**
   * Format mathematical expressions for better readability
   */
  formatExpression(expression) {
    if (!expression || typeof expression !== 'string') {
      return expression;
    }
    
    // Since our enhanced matrix calculator already provides simplified results,
    // we only need basic formatting without re-simplification
    return expression
      .replace(/\*/g, ' × ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Simplify mathematical expressions to make them user-friendly
   */
  simplifyExpression(expression) {
    if (!expression || typeof expression !== 'string') {
      return expression;
    }

    try {
      // First try Math.js simplification if available
      if (typeof math !== 'undefined' && math.simplify) {
        try {
          const simplified = math.simplify(expression).toString();
          return simplified;
        } catch (mathError) {
          console.log('Math.js simplification failed, using manual method');
        }
      }

      // Fallback to manual simplification
      let simplified = expression;

      // Pattern 1: Remove multiplication by 0 -> results in 0
      // (0) × (anything) = 0 or (anything) × (0) = 0
      simplified = simplified.replace(/\(\s*0\s*\)\s*\*\s*\([^)]+\)/g, '0');
      simplified = simplified.replace(/\([^)]+\)\s*\*\s*\(\s*0\s*\)/g, '0');

      // Pattern 2: Remove multiplication by 1 -> keep the other number
      // (1) × (something) = something or (something) × (1) = something
      simplified = simplified.replace(/\(\s*1\s*\)\s*\*\s*\(([^)]+)\)/g, '($1)');
      simplified = simplified.replace(/\(([^)]+)\)\s*\*\s*\(\s*1\s*\)/g, '($1)');

      // Pattern 3: Simplify expressions like "0 - something" or "something - 0"
      simplified = simplified.replace(/\b0\s*-\s*\(([^)]+)\)/g, '-($1)');
      simplified = simplified.replace(/\(([^)]+)\)\s*-\s*0\b/g, '($1)');

      // Pattern 4: Simplify "0 + something" or "something + 0"
      simplified = simplified.replace(/\b0\s*\+\s*\(([^)]+)\)/g, '($1)');
      simplified = simplified.replace(/\(([^)]+)\)\s*\+\s*0\b/g, '($1)');

      // Pattern 5: Handle negative zero results
      simplified = simplified.replace(/\b0\s*-\s*0\b/g, '0');

      // Pattern 6: Evaluate simple arithmetic when possible
      simplified = this.evaluateSimpleArithmetic(simplified);

      // Pattern 7: Clean up unnecessary parentheses around single numbers/variables
      simplified = simplified.replace(/\(([a-zA-Z0-9]+)\)/g, '$1');

      // Pattern 8: Remove extra spaces and clean up
      simplified = simplified.replace(/\s+/g, ' ').trim();

      // Pattern 9: If the result is just "0 - 0" or similar, make it "0"
      if (simplified.match(/^0\s*[-+]\s*0$/)) {
        simplified = '0';
      }

      // Pattern 10: Handle expressions that are entirely zero
      if (simplified.match(/^0(\s*[-+*]\s*0)*$/)) {
        simplified = '0';
      }

      return simplified;

    } catch (error) {
      console.warn('Error simplifying expression:', error);
      return expression; // Return original if simplification fails
    }
  }

  /**
   * Evaluate simple arithmetic expressions
   */
  evaluateSimpleArithmetic(expression) {
    try {
      // Pattern: (number) operation (number)
      const arithmeticPattern = /\((\d+)\)\s*([-+*])\s*\((\d+)\)/g;
      
      return expression.replace(arithmeticPattern, (match, num1, operator, num2) => {
        const a = parseInt(num1);
        const b = parseInt(num2);
        
        switch (operator) {
          case '+':
            return (a + b).toString();
          case '-':
            return (a - b).toString();
          case '*':
            return (a * b).toString();
          default:
            return match; // Return original if unknown operator
        }
      });
    } catch (error) {
      return expression; // Return original if evaluation fails
    }
  }

  /**
   * Animate the result display entrance
   */
  animateResultDisplay() {
    const container = document.querySelector('.clean-result-container');
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
      
      // Animate components
      const components = container.querySelectorAll('.vector-component');
      components.forEach((comp, index) => {
        comp.style.opacity = '0';
        comp.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          comp.style.transition = 'all 0.3s ease';
          comp.style.opacity = '1';
          comp.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
      });
    }
  }

  /**
   * Copy result to clipboard
   */
  copyResult(text) {
    navigator.clipboard.writeText(text).then(() => {
      // Show success feedback
      const button = event.target.closest('.copy-button');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.style.color = '#10b981';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.color = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  /* 
   * Note: Old complex cross product display functions have been replaced 
   * with the new clean result display system above.
   */

  /**
   * Update the detailed results card
   */
  updateDetailedResults(operationResult) {
    const resultsCard = document.getElementById('matrix-results');
    const resultsContent = document.getElementById('matrix-result-content');
    
    let resultDisplay = '';
    
    if (operationResult.isSymbolic) {
      // Enhanced symbolic result display with proper matrix brackets
      if (Array.isArray(operationResult.result)) {
        resultDisplay = `
          <div class="symbolic-result-section">
            <h5><i class="fas fa-code"></i> 3D Symbolic Cross Product Result:</h5>
            <div class="matrix-result-display">
              <div class="result-bracket-container">
                <div class="result-bracket left-bracket">
                  <div class="result-bracket-top"></div>
                  <div class="result-bracket-middle"></div>
                  <div class="result-bracket-bottom"></div>
                </div>
                <div class="matrix-result-grid size-3x1">
                  ${operationResult.result.map((expr, index) => `
                    <div class="result-value symbolic-cross vector matrix-cell" title="Component ${['i', 'j', 'k'][index]}: ${expr}">
                      <div class="component-label">${['i', 'j', 'k'][index]}:</div>
                      <div class="component-expression">${expr}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="result-bracket right-bracket">
                  <div class="result-bracket-top"></div>
                  <div class="result-bracket-middle"></div>
                  <div class="result-bracket-bottom"></div>
                </div>
              </div>
              <div class="result-matrix-label">A × B (Symbolic)</div>
            </div>
          </div>
        `;
      } else {
        resultDisplay = `
          <div class="symbolic-result-section">
            <h5><i class="fas fa-code"></i> 2D Symbolic Cross Product Result:</h5>
            <div class="matrix-result-display">
              <div class="result-bracket-container">
                <div class="result-bracket left-bracket">
                  <div class="result-bracket-top"></div>
                  <div class="result-bracket-middle"></div>
                  <div class="result-bracket-bottom"></div>
                </div>
                <div class="matrix-result-grid size-1x1">
                  <div class="result-value symbolic-cross scalar matrix-cell" title="Symbolic Result: ${operationResult.result}">
                    ${operationResult.result}
                  </div>
                </div>
                <div class="result-bracket right-bracket">
                  <div class="result-bracket-top"></div>
                  <div class="result-bracket-middle"></div>
                  <div class="result-bracket-bottom"></div>
                </div>
              </div>
              <div class="result-matrix-label">A × B (Scalar)</div>
            </div>
          </div>
        `;
      }
    } else {
      // Numeric result display
      const enhancedCalculator = new EnhancedMatrixCalculator();
      const resultData = enhancedCalculator.formatMatrixDisplay(
        operationResult.result, 
        `${operationResult.description || 'Result'}`
      );
      const matrixHTML = enhancedCalculator.generateMatrixHTML(resultData);
      
      resultDisplay = `
        <div class="matrix-result-display">
          ${matrixHTML}
        </div>
      `;
    }
    
    let html = `
      <div class="results-grid">
        <div class="result-card">
          <div class="result-header">
            <h4>${operationResult.description || 'Matrix Operation'}</h4>
          </div>
          <div class="result-body">
            <div class="matrix-operation-summary">
              <p><strong>Operation:</strong> ${operationResult.symbol || operationResult.operation}</p>
              <p><strong>Result Type:</strong> ${operationResult.isSymbolic ? 'Symbolic' : 'Numeric'}</p>
            </div>
            
            ${resultDisplay}
          </div>
        </div>
      </div>
    `;
    
    resultsContent.innerHTML = html;
    resultsCard.style.display = 'block';
    resultsCard.classList.add('fade-in');
    
    // Scroll to results
    setTimeout(() => {
      resultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  /**
   * Format symbolic result for display
   */
  formatSymbolicResult(symbolicResult) {
    if (Array.isArray(symbolicResult)) {
      // 3D cross product symbolic result
      return `
        <div class="symbolic-vector">
          <div class="symbolic-component">i: ${symbolicResult[0]}</div>
          <div class="symbolic-component">j: ${symbolicResult[1]}</div>
          <div class="symbolic-component">k: ${symbolicResult[2]}</div>
        </div>
      `;
    } else {
      // 2D cross product symbolic result
      return `<div class="symbolic-scalar">${symbolicResult}</div>`;
    }
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
   * Create result cell with IG styling and 2 decimal places
   */
  createResultCell(value, type, index) {
    const cell = document.createElement('div');
    cell.className = `result-value ${type} matrix-cell`;
    
    // Format the value to 2 decimal places
    const formattedValue = typeof value === 'number' ? 
      (Math.abs(value) < 0.001 ? '0.00' : value.toFixed(2)) : 
      String(value);
    
    cell.textContent = formattedValue;
    cell.setAttribute('aria-label', `Result: ${formattedValue}`);
    cell.setAttribute('title', `${type.charAt(0).toUpperCase() + type.slice(1)}: ${formattedValue}`);
    
    // Add animation delay based on index
    cell.style.animationDelay = `${index * 0.1}s`;
    
    return cell;
  }

  /**
   * Display equation results with IG styling and 2 decimal places
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
        const formattedValue = Math.abs(value) < 0.001 ? '0.00' : value.toFixed(2);
        html += `
          <div class="variable-result">
            <span class="variable-name">${variable}</span>
            <span class="variable-equals">=</span>
            <span class="variable-value">${formattedValue}</span>
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
    let hasSymbolic = false;
    
    // Get Matrix A
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-a-${i}-${j}`);
        const rawValue = input.value.trim();
        
        // Check if value contains variables (letters)
        if (/[a-zA-Z]/.test(rawValue)) {
          hasSymbolic = true;
          row.push(rawValue); // Keep as string for symbolic operations
        } else {
          const numValue = parseFloat(rawValue) || 0;
          row.push(numValue);
        }
      }
      matrixA.push(row);
    }
    
    // Get Matrix B
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const input = document.getElementById(`matrix-b-${i}-${j}`);
        const rawValue = input.value.trim();
        
        // Check if value contains variables (letters)
        if (/[a-zA-Z]/.test(rawValue)) {
          hasSymbolic = true;
          row.push(rawValue); // Keep as string for symbolic operations
        } else {
          const numValue = parseFloat(rawValue) || 0;
          row.push(numValue);
        }
      }
      matrixB.push(row);
    }
    
    // Automatically use symbolic operation if variables detected
    let operation = this.currentOperation;
    if (hasSymbolic && operation === 'cross') {
      operation = 'cross_symbolic';
      console.log('🔄 Auto-switching to symbolic cross product due to variables detected');
    }
    
    console.log('📊 Dual Matrix Data:', { matrixA, matrixB, hasSymbolic, operation });
    
    return { matrixA, matrixB, rows, cols, operation };
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
        return calculator.crossProductVectorsImproved(matrixA, matrixB);
      case 'cross_symbolic':
        // Convert matrices to vectors for cross product (flatten if needed)
        const vectorA = Array.isArray(matrixA[0]) ? matrixA.flat() : matrixA;
        const vectorB = Array.isArray(matrixB[0]) ? matrixB.flat() : matrixB;
        console.log('🎯 Calling crossProductSymbolicOperation with:', { vectorA, vectorB });
        return calculator.crossProductSymbolicOperation(vectorA, vectorB);
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
      return Math.abs(result) < 0.001 ? '0.00' : result.toFixed(2);
    } else if (Array.isArray(result)) {
      return result.map(row => 
        Array.isArray(row) ? 
        `[${row.map(val => (Math.abs(val) < 0.001 ? '0.00' : val.toFixed(2))).join(', ')}]` :
        (Math.abs(row) < 0.001 ? '0.00' : row.toFixed(2))
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
      // Remove error styling and restore normal styling
      input.style.borderColor = 'var(--glass-border)';
      input.style.backgroundColor = 'var(--surface-black)';
      input.style.color = 'var(--text-primary)';
    } else {
      // Show error styling for invalid input
      input.style.borderColor = 'var(--error, #ef4444)';
      input.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
      input.style.color = 'var(--text-primary)';
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
   * Validate alphanumeric input (numbers and variables like '3x')
   */
  validateAlphanumericInput(event) {
    const input = event.target;
    const value = input.value;
    
    // Allow empty input, numbers, variables, decimal points, and negative signs
    // Pattern allows: numbers, variables (like 'x', 'y'), combinations (like '3x', '-2y'), decimals
    const validPattern = /^-?(\d*\.?\d*[a-zA-Z]*|\d*[a-zA-Z]+\d*\.?\d*|[a-zA-Z]+\d*\.?\d*|\d*\.?\d*)$/;
    
    if (value === '' || value === '-' || value === '.' || validPattern.test(value)) {
      // Remove error styling and restore normal styling
      input.style.borderColor = 'var(--glass-border)';
      input.style.backgroundColor = 'var(--surface-black)';
      input.style.color = 'var(--text-primary)';
    } else {
      // Show error styling for invalid input
      input.style.borderColor = 'var(--error, #ef4444)';
      input.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
      input.style.color = 'var(--text-primary)';
    }
  }

  /**
   * Restrict input to alphanumeric characters (numbers, letters, decimal, minus)
   */
  restrictToAlphanumericInput(event) {
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
    
    // Allow numbers, letters, decimal point, and minus sign
    if (!/[\d\.\-a-zA-Z]/.test(char)) {
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
