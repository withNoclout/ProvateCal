// Test backend vs UI disconnect
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
const A = ["2", "3x", "y"];
const B = ["1", "3", "5"];

console.log('🔍 BACKEND TEST:');
console.log('Input A:', A);
console.log('Input B:', B);

const result = calc.crossProductSymbolicOperation(A, B);
console.log('Backend Result:', result.result);
console.log('Expected: ["15x - 3y", "y - 10", "6 - 3x"]');

const matches = JSON.stringify(result.result) === JSON.stringify(["15x - 3y", "y - 10", "6 - 3x"]);
console.log('✅ Backend works:', matches);

console.log('\n🔍 UI SHOWS:');
console.log('i: 0 - 12');
console.log('j: 3 - 10');
console.log('k: 8');

console.log('\n❌ DISCONNECT: Backend produces correct results but UI shows different values!');
console.log('This means the UI is either:');
console.log('1. Calling a different function');
console.log('2. Using different input values');
console.log('3. Using the old calculator instead of enhanced one');
