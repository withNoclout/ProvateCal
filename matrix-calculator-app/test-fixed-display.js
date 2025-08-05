// Test formatMatrixDisplay with the FIXED cross product result
const fs = require('fs');
const vm = require('vm');

global.math = {
  simplify: function(expr) {
    let result = expr.toString();
    result = result.replace(/\(([^)]+)\)/g, '$1');
    return { toString: () => result };
  }
};

const calculatorCode = fs.readFileSync('./src/js/enhanced-matrix-calculator.js', 'utf8');
const cleanCode = calculatorCode.replace(/module\.exports.*?;/g, '');
vm.runInThisContext(cleanCode);

const calc = new EnhancedMatrixCalculator();

// This is the NEW fixed format (numbers instead of strings)
const fixedCrossProductResult = [[ -101 ], [ -1 ], [ 41 ]];

console.log('🔍 Testing formatMatrixDisplay with FIXED result:');
console.log('Input matrix:', fixedCrossProductResult);

const formatted = calc.formatMatrixDisplay(fixedCrossProductResult, '3D Cross Product (A × B)');
console.log('Formatted result:', formatted);

console.log('\n✅ Should now show actual values instead of 0.00!');
