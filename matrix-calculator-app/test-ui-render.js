// Test UI rendering logic exactly
const testResult = {
  operation: 'crossProductSymbolic',
  result: ["15x - 3y", "y - 10", "6 - 3x"]
};

// Simulate formatExpression function
function formatExpression(expression) {
  if (!expression || typeof expression !== 'string') {
    return expression;
  }
  
  return expression
    .replace(/\*/g, ' × ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Simulate generateVectorDisplay function
function generateVectorDisplay(vectorResult) {
  const components = ['i', 'j', 'k'];
  
  return `
    <div class="vector-result">
      <span class="vector-bracket">[</span>
      <div class="vector-components">
        ${vectorResult.map((expr, index) => `
          <div class="vector-component">
            <div class="component-badge">${components[index]}</div>
            <div class="component-value">${formatExpression(expr)}</div>
          </div>
        `).join('')}
      </div>
      <span class="vector-bracket">]</span>
    </div>
  `;
}

// Simulate generateCleanResultDisplay function
function generateCleanResultDisplay(operationResult) {
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
        ${isVector ? generateVectorDisplay(operationResult.result) : generateScalarDisplay(operationResult.result)}
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

console.log('Testing UI generation:');
console.log('Input result:', testResult.result);

const html = generateCleanResultDisplay(testResult);
console.log('\nGenerated HTML:');
console.log(html);

// Check what goes into the copy button
const copyText = testResult.result.join(', ');
console.log('\nCopy button text:', copyText);

// Check each formatted expression
console.log('\nFormatted expressions:');
testResult.result.forEach((expr, index) => {
  const formatted = formatExpression(expr);
  console.log(`${index}: "${expr}" -> "${formatted}"`);
});
