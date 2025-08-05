// Test simple cross product calculation
// A = [2, 3, 5], B = [1, 22, 3]
// Cross product formula: A × B = [a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1]

const A = [2, 3, 5];
const B = [1, 22, 3];

console.log('🔢 SIMPLE CROSS PRODUCT TEST:');
console.log('Input A:', A);
console.log('Input B:', B);

// Manual calculation
const i = A[1] * B[2] - A[2] * B[1]; // 3*3 - 5*22 = 9 - 110 = -101
const j = A[2] * B[0] - A[0] * B[2]; // 5*1 - 2*3 = 5 - 6 = -1
const k = A[0] * B[1] - A[1] * B[0]; // 2*22 - 3*1 = 44 - 3 = 41

console.log('Expected result: [', i, ',', j, ',', k, ']');
console.log('Expected: [-101, -1, 41]');

console.log('\n❌ UI shows: [0.00, 0.00, 0.00]');
console.log('✅ Should show: [-101, -1, 41]');
