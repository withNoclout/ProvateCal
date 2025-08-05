// Test the crossProduct3D function directly
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
const A = [2, 3, 5];
const B = [1, 22, 3];

console.log('🔢 TESTING crossProduct3D function:');
console.log('Input A:', A);
console.log('Input B:', B);

try {
  const result = calc.crossProduct3D(A, B);
  console.log('crossProduct3D result:', result);
  console.log('Expected: [-101, -1, 41]');
} catch (error) {
  console.error('Error in crossProduct3D:', error.message);
}

console.log('\n🔢 TESTING crossProductVectorsImproved function:');
try {
  const result2 = calc.crossProductVectorsImproved(A, B);
  console.log('crossProductVectorsImproved result:', result2);
} catch (error) {
  console.error('Error in crossProductVectorsImproved:', error.message);
}
