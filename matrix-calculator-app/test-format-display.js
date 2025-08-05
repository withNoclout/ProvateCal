// Test formatMatrixDisplay with cross product result
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

// This is what crossProductVectorsImproved returns for the result field
const crossProductResult = [[ '-101.00' ], [ '-1.00' ], [ '41.00' ]];

console.log('🔍 Testing formatMatrixDisplay:');
console.log('Input matrix:', crossProductResult);

const formatted = calc.formatMatrixDisplay(crossProductResult, '3D Cross Product (A × B)');
console.log('Formatted result:', formatted);

console.log('\n🔍 Testing formatNumber on string:');
console.log('formatNumber("-101.00"):', calc.formatNumber('-101.00'));
console.log('formatNumber(-101):', calc.formatNumber(-101));
