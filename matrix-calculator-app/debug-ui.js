// Debug UI display issue
const testResult = {
  operation: 'crossProductSymbolic',
  result: ["15x - 3y", "y - 10", "6 - 3x"]
};

console.log('Input to UI:', testResult);
console.log('Each component:');
testResult.result.forEach((expr, index) => {
  console.log(`Component ${index}: "${expr}"`);
  console.log(`Type: ${typeof expr}`);
  console.log(`Length: ${expr.length}`);
});

// Test formatExpression function logic
function formatExpression(expression) {
  if (!expression || typeof expression !== 'string') {
    return expression;
  }
  
  console.log(`Before formatting: "${expression}"`);
  const result = expression
    .replace(/\*/g, ' × ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`After formatting: "${result}"`);
  return result;
}

console.log('\nTesting formatExpression:');
testResult.result.forEach((expr, index) => {
  console.log(`\n--- Component ${index} ---`);
  formatExpression(expr);
});
